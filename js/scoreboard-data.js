/* ==========================================
   Scoreboard Data — Allegory of the Trade
   ==========================================

   To update the list:
   1. Edit the PICKS array below
   2. Each pick needs: company, ticker, marketCap, score, dateAdded, priceAtAdd
   3. currentPrice is fetched live — the hardcoded value is used as a fallback
   4. Returns and months are calculated automatically
   5. Rank is determined by array order (index + 1)

   marketCap format: number in dollars (will be formatted to "$XXM")
   score: composite score from the screener (0-100)
   priceAtAdd: closing price on the date of inclusion (frozen, never changes)
   currentPrice: fallback price if live fetch fails
*/

const SCOREBOARD_CONFIG = {
  listDate: "February 2026",
  listVersion: "beta",
};

const PICKS = [
  {
    company: "Core Molding Technologies Inc",
    ticker: "CMT",
    marketCap: 164377984,
    score: 75.5,
    dateAdded: "2026-02-21",
    priceAtAdd: 19.20,
    currentPrice: 19.20,
    breakdown: {
      value:    { score: 58, note: "Trades at ~5.8x EV/EBITDA near book value (P/B 1.06); top deep-screen valuation score" },
      quality:  { score: 46, note: "Structural composites for truck/industrial; 4.4% operating margin trending higher" },
      strength: { score: 62, note: "Net cash position, current ratio 2.9x; strong cashflow generation" },
      insider:  { score: 50, note: "CEO succession planned for June 2026; board holds steady positions" },
    },
  },
  {
    company: "Espey Mfg & Electronics Corp.",
    ticker: "ESP",
    marketCap: 171760832,
    score: 72.8,
    dateAdded: "2026-02-21",
    priceAtAdd: 58.05,
    currentPrice: 58.05,
    breakdown: {
      value:    { score: 38, note: "Higher multiple at P/B 3.2x but supported by 6.8% FCF yield" },
      quality:  { score: 90, note: "Defense/power electronics niche; 23% operating margins and 18% ROIC" },
      strength: { score: 71, note: "No long-term debt, current ratio 2.5x; perfect cashflow trend score" },
      insider:  { score: 50, note: "Some insider selling noted, not disqualifying; management holds meaningful equity" },
    },
  },
  {
    company: "Optex Systems Holdings Inc",
    ticker: "OPXS",
    marketCap: 82138320,
    score: 71.8,
    dateAdded: "2026-02-21",
    priceAtAdd: 11.84,
    currentPrice: 11.84,
    breakdown: {
      value:    { score: 42, note: "Premium multiple (P/B 3.3x) offset by 7.8% FCF yield; top valuation in deep screen" },
      quality:  { score: 89, note: "Optical instruments for defense; 17% operating margins, 21% ROIC, strong revenue trend" },
      strength: { score: 90, note: "Fortress balance sheet — current ratio 5.9x, net cash position" },
      insider:  { score: 50, note: "CEO departure announced; monitoring leadership transition and govt contract pipeline" },
    },
  },
  {
    company: "CareCloud, Inc.",
    ticker: "CCLD",
    marketCap: 102176872,
    score: 70.2,
    dateAdded: "2026-02-21",
    priceAtAdd: 2.41,
    currentPrice: 2.41,
    breakdown: {
      value:    { score: 78, note: "Deep value at 4.0x EV/EBITDA with exceptional 21% FCF yield" },
      quality:  { score: 87, note: "Healthcare SaaS platform; 10% operating margins, 18% ROIC" },
      strength: { score: 27, note: "Thin current ratio at 1.26x; leverage from aggressive M&A in 2025" },
      insider:  { score: 50, note: "Management building through acquisitions; no notable open-market transactions" },
    },
  },
  {
    company: "Flexsteel Industries Inc",
    ticker: "FLXS",
    marketCap: 285076096,
    score: 69.7,
    dateAdded: "2026-02-21",
    priceAtAdd: 53.33,
    currentPrice: 53.33,
    breakdown: {
      value:    { score: 64, note: "Reasonable P/B 1.6x with strong 9.8% FCF yield; near-perfect valuation trend" },
      quality:  { score: 64, note: "Household furniture maker; 23% gross margins, 11% ROIC, improving margin trend" },
      strength: { score: 58, note: "Net cash position, current ratio 3.0x; balance sheet lighter than peers" },
      insider:  { score: 50, note: "No notable recent insider activity; tariff risk flagged as watch item" },
    },
  },
  {
    company: "Lifevantage Corp",
    ticker: "LFVN",
    marketCap: 62047788,
    score: 69.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 4.85,
    currentPrice: 4.85,
    breakdown: {
      value:    { score: 54, note: "Low multiple at 3.6x EV/EBITDA; priced for no growth" },
      quality:  { score: 71, note: "Health supplement MLM; 79% gross margins but only 4.3% operating margin; 24% ROIC" },
      strength: { score: 65, note: "Low debt, current ratio 2.0x, net cash position; minimal dilution" },
      insider:  { score: 50, note: "GLP-1 revenue headwind noted; new management still building positions" },
    },
  },
  {
    company: "Alpha Pro Tech Ltd",
    ticker: "APT",
    marketCap: 53935448,
    score: 67.2,
    dateAdded: "2026-02-21",
    priceAtAdd: 5.15,
    currentPrice: 5.15,
    breakdown: {
      value:    { score: 65, note: "Trades below book value (P/B 0.86); 4.9% FCF yield" },
      quality:  { score: 48, note: "PPE and building supply products; 38% gross margins but modest 6% ROIC" },
      strength: { score: 92, note: "Zero debt, current ratio 14.1x; zero dilution — fortress balance sheet" },
      insider:  { score: 50, note: "No notable recent insider transactions" },
    },
  },
  {
    company: "J.Jill, Inc.",
    ticker: "JILL",
    marketCap: 265571456,
    score: 67.2,
    dateAdded: "2026-02-21",
    priceAtAdd: 17.44,
    currentPrice: 17.44,
    breakdown: {
      value:    { score: 77, note: "Deep value at 2.9x EV/EBITDA with 19% FCF yield" },
      quality:  { score: 85, note: "Women's retail with 70% gross margins, 20% ROIC; strong margin trend" },
      strength: { score: 16, note: "Higher leverage from PE-backed structure; current ratio 1.15x; dilution concern" },
      insider:  { score: 50, note: "PE firm holds 48% stake; no buyout deal announced" },
    },
  },
  {
    company: "NCS Multistage Holdings, Inc.",
    ticker: "NCSM",
    marketCap: 101255656,
    score: 64.3,
    dateAdded: "2026-02-21",
    priceAtAdd: 39.85,
    currentPrice: 39.85,
    breakdown: {
      value:    { score: 79, note: "Trades below book value (P/B 0.92) with strong 18.3% FCF yield" },
      quality:  { score: 69, note: "Completion tools specialist; lower margins but stable cyclical operator" },
      strength: { score: 64, note: "Clean balance sheet, current ratio 4.4x, net cash position" },
      insider:  { score: 50, note: "Acquired ResMetrics; board members hold steady positions" },
    },
  },
  {
    company: "SIFCO Industries Inc",
    ticker: "SIF",
    marketCap: 78062008,
    score: 63.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 12.56,
    currentPrice: 12.56,
    breakdown: {
      value:    { score: 61, note: "Moderate 8.1x EV/EBITDA offset by strong 14.8% FCF yield" },
      quality:  { score: 67, note: "Aircraft engine parts; 17% gross margins, margin trend improving" },
      strength: { score: 57, note: "Manageable leverage, current ratio 1.7x; cashflow generation mixed" },
      insider:  { score: 50, note: "Turnaround inflecting to profitability; board holds steady positions" },
    },
  },
];


/* ==========================================
   LIVE QUOTE FETCHING
   Uses the same Cloudflare Worker + CORS
   proxy fallback strategy as market-data.js
   ========================================== */

const SB_WORKER_URLS = [
  'https://api.allegoryofthetrade.com/?ticker=',
  'https://stock-proxy.reedmcasey.workers.dev/?ticker=',
];
const SB_YF_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart/';
const SB_PROXIES = [
  function(url) { return 'https://corsproxy.io/?' + encodeURIComponent(url); },
  function(url) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url); },
  function(url) { return 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url); },
];

async function sbFetchQuote(ticker) {
  // Try Cloudflare Worker endpoints first
  for (var i = 0; i < SB_WORKER_URLS.length; i++) {
    try {
      var res = await fetch(SB_WORKER_URLS[i] + encodeURIComponent(ticker), { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        var data = await res.json();
        if (data.price !== undefined) return data.price;
      }
    } catch (e) {}
  }

  // Fallback: CORS proxies -> Yahoo Finance
  var yfUrl = SB_YF_BASE + encodeURIComponent(ticker) + '?interval=1d&range=5d';
  for (var j = 0; j < SB_PROXIES.length; j++) {
    try {
      var proxyUrl = SB_PROXIES[j](yfUrl);
      var res2 = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
      if (!res2.ok) continue;
      var data2 = await res2.json();
      return data2.chart.result[0].meta.regularMarketPrice;
    } catch (e) {}
  }

  // All sources failed — return null so we use the fallback price
  return null;
}


/* ==========================================
   RENDERING
   ========================================== */

function formatMarketCap(val) {
  if (val >= 1e9) return "$" + (val / 1e9).toFixed(1) + "B";
  if (val >= 1e6) return "$" + (val / 1e6).toFixed(0) + "M";
  return "$" + val.toLocaleString();
}

function monthsBetween(dateStr) {
  var added = new Date(dateStr + "T00:00:00");
  var now = new Date();
  var months = (now.getFullYear() - added.getFullYear()) * 12 + (now.getMonth() - added.getMonth());
  if (months < 1) return "<1";
  return months.toString();
}

function calcReturn(priceAtAdd, currentPrice) {
  if (!priceAtAdd || priceAtAdd === 0) return 0;
  return ((currentPrice - priceAtAdd) / priceAtAdd) * 100;
}

function formatDate(dateStr) {
  var d = new Date(dateStr + "T00:00:00");
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months[d.getMonth()] + " " + d.getFullYear();
}

function renderScoreboard() {
  var tbody = document.getElementById("scoreboard-body");
  var dateEl = document.getElementById("list-date");

  if (dateEl) {
    dateEl.textContent = SCOREBOARD_CONFIG.listDate;
    if (SCOREBOARD_CONFIG.listVersion === "beta") {
      dateEl.textContent += " (Beta)";
    }
  }

  if (!tbody) return;

  tbody.innerHTML = "";

  for (var i = 0; i < PICKS.length; i++) {
    var pick = PICKS[i];
    var ret = calcReturn(pick.priceAtAdd, pick.currentPrice);
    var retClass = ret > 0 ? "up" : ret < 0 ? "down" : "";
    var retSign = ret > 0 ? "+" : "";
    var months = monthsBetween(pick.dateAdded);

    // Main data row
    var row = document.createElement("tr");
    row.setAttribute("data-ticker", pick.ticker);
    row.className = "scoreboard-row";
    row.style.cursor = "pointer";
    row.innerHTML =
      '<td class="col-rank">' + (i + 1) + '</td>' +
      '<td class="col-company">' + pick.company + ' <span class="expand-hint">&#9662;</span></td>' +
      '<td class="col-ticker"><strong>' + pick.ticker + '</strong></td>' +
      '<td class="col-mcap">' + formatMarketCap(pick.marketCap) + '</td>' +
      '<td class="col-score">' + pick.score.toFixed(1) + '</td>' +
      '<td class="col-added">' + formatDate(pick.dateAdded) + '</td>' +
      '<td class="col-months">' + months + '</td>' +
      '<td class="col-return ' + retClass + '">' + retSign + ret.toFixed(1) + '%</td>';

    tbody.appendChild(row);

    // Breakdown dropdown row (hidden by default)
    if (pick.breakdown) {
      var dropRow = document.createElement("tr");
      dropRow.className = "breakdown-row";
      dropRow.setAttribute("data-ticker-breakdown", pick.ticker);

      var cell = document.createElement("td");
      cell.setAttribute("colspan", "8");
      cell.innerHTML = renderBreakdown(pick.breakdown);
      dropRow.appendChild(cell);
      tbody.appendChild(dropRow);

      // Click handler to toggle
      (function(ticker) {
        row.addEventListener("click", function() {
          toggleBreakdown(ticker);
        });
      })(pick.ticker);
    }
  }
}

function renderBreakdown(b) {
  var components = [
    { key: "value",    label: "Value" },
    { key: "quality",  label: "Quality" },
    { key: "strength", label: "Financial Strength" },
    { key: "insider",  label: "Insider Activity" },
  ];

  var html = '<div class="breakdown-panel">';
  for (var i = 0; i < components.length; i++) {
    var c = components[i];
    var data = b[c.key];
    if (!data) continue;
    var barWidth = Math.min(Math.max(data.score, 0), 100);
    var opacity = (barWidth / 100).toFixed(2);
    var barBg = 'rgba(22,163,74,' + opacity + ')';
    html +=
      '<div class="breakdown-item">' +
        '<div class="breakdown-header">' +
          '<span class="breakdown-label">' + c.label + '</span>' +
          '<span class="breakdown-score">' + data.score + '/100</span>' +
        '</div>' +
        '<div class="breakdown-bar-track">' +
          '<div class="breakdown-bar-fill" style="width:' + barWidth + '%;background:' + barBg + '"></div>' +
        '</div>' +
        '<div class="breakdown-note">' + data.note + '</div>' +
      '</div>';
  }
  html += '</div>';
  return html;
}

function toggleBreakdown(ticker) {
  var dropRow = document.querySelector('tr[data-ticker-breakdown="' + ticker + '"]');
  var mainRow = document.querySelector('tr[data-ticker="' + ticker + '"]');
  if (!dropRow || !mainRow) return;

  var isOpen = dropRow.classList.contains("open");
  // Close all others first
  var allOpen = document.querySelectorAll(".breakdown-row.open");
  for (var i = 0; i < allOpen.length; i++) {
    allOpen[i].classList.remove("open");
  }
  var allExpanded = document.querySelectorAll(".scoreboard-row.expanded");
  for (var j = 0; j < allExpanded.length; j++) {
    allExpanded[j].classList.remove("expanded");
  }

  // Toggle this one
  if (!isOpen) {
    dropRow.classList.add("open");
    mainRow.classList.add("expanded");
  }
}


/* ==========================================
   LIVE UPDATE — fetch quotes and update
   the return column in place
   ========================================== */

async function updateLivePrices() {
  var results = await Promise.allSettled(
    PICKS.map(function(pick) { return sbFetchQuote(pick.ticker); })
  );

  var tbody = document.getElementById("scoreboard-body");
  if (!tbody) return;

  var anyUpdated = false;

  for (var i = 0; i < PICKS.length; i++) {
    var result = results[i];
    if (result.status === "fulfilled" && result.value !== null) {
      var livePrice = result.value;
      PICKS[i].currentPrice = livePrice;
      anyUpdated = true;

      // Update the return cell in the existing row
      var row = tbody.querySelector('tr[data-ticker="' + PICKS[i].ticker + '"]');
      if (row) {
        var ret = calcReturn(PICKS[i].priceAtAdd, livePrice);
        var retClass = ret > 0 ? "up" : ret < 0 ? "down" : "";
        var retSign = ret > 0 ? "+" : "";
        var returnCell = row.querySelector(".col-return");
        if (returnCell) {
          returnCell.className = "col-return " + retClass;
          returnCell.textContent = retSign + ret.toFixed(1) + "%";
        }
      }
    }
  }

  // Show last updated timestamp if any quotes came through
  if (anyUpdated) {
    var footer = document.querySelector(".scoreboard-footer-note");
    if (footer) {
      var existingTs = document.getElementById("scoreboard-updated");
      var time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      if (existingTs) {
        existingTs.textContent = "Prices updated " + time;
      } else {
        var ts = document.createElement("p");
        ts.id = "scoreboard-updated";
        ts.style.cssText = "font-size:0.72rem;color:#aaa;margin-top:0.5rem;";
        ts.textContent = "Prices updated " + time;
        footer.appendChild(ts);
      }
    }
  }
}


/* ==========================================
   INIT — render immediately with fallback
   prices, then fetch live quotes and refresh
   every 60 seconds
   ========================================== */

document.addEventListener("DOMContentLoaded", function() {
  renderScoreboard();
  updateLivePrices();
  setInterval(updateLivePrices, 60000);
});
