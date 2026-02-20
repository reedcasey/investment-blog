/* ==========================================
   Allegory of the Trade â Market Data Engine
   Handles live stock quotes via Cloudflare
   Worker proxy with CORS proxy fallbacks.
   ========================================== */

// ==========================================
// CONFIGURATION â edit these to change tickers
// ==========================================
const PORTFOLIO = [
  { ticker: 'GEHC', name: 'GE HealthCare' },
  { ticker: 'ACNT', name: 'Ascent Industries' },
];
const WATCHLIST = [
  { ticker: 'HON' },
  { ticker: 'SOLS' },
];
const INDICES = [
  { ticker: '^GSPC', label: 'S&P 500' },
  { ticker: '^IXIC', label: 'Nasdaq' },
  { ticker: '^TNX',  label: '10Y Treasury' },
  { ticker: '^VIX',  label: 'VIX' },
  { ticker: 'GC=F',  label: 'Gold' },
];

// ==========================================
// FETCH HELPERS
// ==========================================
// Primary: own Cloudflare Worker proxy (reliable, custom domain)
// Fallback: workers.dev URL, then public CORS proxies
const WORKER_URLS = [
  'https://api.allegoryofthetrade.com/?ticker=',
  'https://stock-proxy.reedmcasey.workers.dev/?ticker=',
];
const YF_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart/';
const PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

async function fetchQuote(ticker) {
  // Try Cloudflare Worker endpoints first
  for (const workerUrl of WORKER_URLS) {
    try {
      const res = await fetch(workerUrl + encodeURIComponent(ticker), { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const data = await res.json();
        if (data.price !== undefined) return data;
      }
    } catch {}
  }

  // Fallback: CORS proxies â Yahoo Finance
  const yfUrl = `${YF_BASE}${encodeURIComponent(ticker)}?interval=1d&range=5d`;
  let lastError;
  for (const makeProxy of PROXIES) {
    try {
      const url = makeProxy(yfUrl);
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const meta = data.chart.result[0].meta;
      const price = meta.regularMarketPrice;
      const prevClose = meta.chartPreviousClose || meta.previousClose;
      const change = ((price - prevClose) / prevClose) * 100;
      return {
        ticker: ticker,
        price: price,
        change: change,
        shortName: meta.shortName || meta.symbol,
      };
    } catch (e) { lastError = e; }
  }
  throw lastError;
}

// ==========================================
// FORMATTERS
// ==========================================
function fmtPrice(p) {
  if (p >= 1000) return '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return '$' + p.toFixed(2);
}
function fmtChange(c) {
  const sign = c >= 0 ? '+' : '';
  return sign + c.toFixed(2) + '%';
}
function cls(c) { return c >= 0 ? 'up' : 'down'; }

// ==========================================
// RENDER: PORTFOLIO
// ==========================================
function renderPortfolio(quotes) {
  const container = document.getElementById('portfolio-holdings');
  if (!container) return;

  // Simple average change (equal-weight since we don't have share counts on the public site)
  const avgChange = quotes.reduce((s, q) => s + q.change, 0) / quotes.length;
  const totalEl = document.getElementById('portfolio-total');
  if (totalEl) {
    totalEl.textContent = fmtChange(avgChange) + ' today';
    totalEl.className = 'portfolio-total ' + cls(avgChange);
  }

  container.innerHTML = quotes.map(q => {
    const nameOverride = PORTFOLIO.find(p => p.ticker === q.ticker)?.name || q.shortName;
    return `
      <div class="holding">
        <div class="holding-left">
          <span class="holding-ticker">${q.ticker}</span>
          <span class="holding-name">${nameOverride}</span>
        </div>
        <div class="holding-right">
          <div class="holding-value">${fmtPrice(q.price)}</div>
          <div class="holding-change ${cls(q.change)}">${fmtChange(q.change)}</div>
        </div>
      </div>`;
  }).join('') + `<div class="last-updated">Updated ${new Date().toLocaleTimeString()}</div>`;
}

// ==========================================
// RENDER: WATCHLIST
// ==========================================
function renderWatchlist(quotes) {
  const container = document.getElementById('watchlist-holdings');
  if (!container) return;

  container.innerHTML = quotes.map(q => `
    <div class="watch-item">
      <div><span class="watch-ticker">${q.ticker}</span></div>
      <div style="text-align:right">
        <span class="watch-price">${fmtPrice(q.price)}</span>
        <div class="watch-change ${cls(q.change)}">${fmtChange(q.change)}</div>
      </div>
    </div>`).join('') + `<div class="last-updated">Updated ${new Date().toLocaleTimeString()}</div>`;
}

// ==========================================
// RENDER: MARKET PULSE
// ==========================================
function renderMarketPulse(quotes) {
  const container = document.getElementById('market-pulse');
  if (!container) return;

  container.innerHTML = quotes.map((q, i) => {
    const label = INDICES[i].label;
    const isTreasury = q.ticker === '^TNX';
    const isGold = q.ticker === 'GC=F';
    const displayPrice = isTreasury ? q.price.toFixed(3) + '%'
      : isGold ? '$' + q.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : q.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `
      <div class="pulse-item">
        <div class="pulse-label">${label}</div>
        <div class="pulse-row">
          <span class="pulse-value">${displayPrice}</span>
          <span class="pulse-change ${cls(q.change)}">${fmtChange(q.change)}</span>
        </div>
      </div>`;
  }).join('') + `<div class="last-updated">Updated ${new Date().toLocaleTimeString()}</div>`;
}

// ==========================================
// ERROR DISPLAY
// ==========================================
function showError(containerId, msg) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="loading-placeholder" style="animation:none;color:var(--red);font-size:0.78rem">${msg}</div>`;
}

// ==========================================
// LOAD ALL MARKET DATA
// ==========================================
async function loadAllMarketData() {
  // Portfolio â fetch individually, filter out failures
  Promise.allSettled(PORTFOLIO.map(p => fetchQuote(p.ticker)))
    .then(results => {
      const quotes = results.filter(r => r.status === 'fulfilled').map(r => r.value);
      if (quotes.length > 0) renderPortfolio(quotes);
      else showError('portfolio-holdings', 'Could not load portfolio data');
    });

  // Watchlist
  Promise.allSettled(WATCHLIST.map(w => fetchQuote(w.ticker)))
    .then(results => {
      const quotes = results.filter(r => r.status === 'fulfilled').map(r => r.value);
      if (quotes.length > 0) renderWatchlist(quotes);
      else showError('watchlist-holdings', 'Could not load watchlist data');
    });

  // Market Pulse
  Promise.allSettled(INDICES.map(idx => fetchQuote(idx.ticker)))
    .then(results => {
      const quotes = results.filter(r => r.status === 'fulfilled').map(r => r.value);
      if (quotes.length > 0) renderMarketPulse(quotes);
      else showError('market-pulse', 'Could not load market data');
    });
}

// ==========================================
// INIT â load on page ready, refresh every 60s
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Only load market data if the sidebar elements exist (i.e., we're on index.html)
  if (document.getElementById('portfolio-holdings')) {
    loadAllMarketData();
    setInterval(loadAllMarketData, 60000);
  }
});
