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
    company: "Espey Mfg & Electronics Corp.",
    ticker: "ESP",
    marketCap: 171760832,
    score: 73.8,
    dateAdded: "2026-02-21",
    priceAtAdd: 58.05,
    currentPrice: 58.05,
    breakdown: {
      value:    { score: 78, note: "P/E of 12.4x with consistent earnings; trades near book value" },
      quality:  { score: 74, note: "Defense/power electronics niche with 15%+ ROIC and stable margins" },
      strength: { score: 72, note: "No long-term debt, current ratio above 3.0" },
      insider:  { score: 62, note: "Modest insider purchases in Q4; management holds meaningful equity" },
    },
  },
  {
    company: "M-tron Industries, Inc.",
    ticker: "MPTI",
    marketCap: 193102992,
    score: 73.8,
    dateAdded: "2026-02-21",
    priceAtAdd: 65.91,
    currentPrice: 65.91,
    breakdown: {
      value:    { score: 71, note: "Reasonable valuation at ~14x earnings for a specialty electronics maker" },
      quality:  { score: 79, note: "High-reliability frequency control products; 20%+ operating margins" },
      strength: { score: 73, note: "Clean balance sheet with minimal leverage and strong cash position" },
      insider:  { score: 65, note: "Directors added shares over the past two quarters" },
    },
  },
  {
    company: "Virco Mfg Corporation",
    ticker: "VIRC",
    marketCap: 97403848,
    score: 73.7,
    dateAdded: "2026-02-21",
    priceAtAdd: 6.18,
    currentPrice: 6.18,
    breakdown: {
      value:    { score: 85, note: "Deeply discounted at ~5x earnings; well below tangible book value" },
      quality:  { score: 65, note: "Dominant in K-12 furniture; margins cyclical but improving" },
      strength: { score: 70, note: "Manageable debt load, positive free cash flow generation" },
      insider:  { score: 68, note: "CEO and CFO both bought shares on the open market recently" },
    },
  },
  {
    company: "Core Molding Technologies Inc",
    ticker: "CMT",
    marketCap: 164377984,
    score: 72.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 19.20,
    currentPrice: 19.20,
    breakdown: {
      value:    { score: 80, note: "Trades at ~8x earnings; significant discount to replacement value" },
      quality:  { score: 72, note: "Structural composites for truck/industrial; improving margin profile" },
      strength: { score: 66, note: "Moderate leverage but strong cash generation covers obligations" },
      insider:  { score: 58, note: "No recent insider sales; board holds steady positions" },
    },
  },
  {
    company: "FONAR Corp",
    ticker: "FONR",
    marketCap: 117110736,
    score: 68.9,
    dateAdded: "2026-02-21",
    priceAtAdd: 18.60,
    currentPrice: 18.60,
    breakdown: {
      value:    { score: 75, note: "MRI pioneer trading at ~10x earnings with hidden asset value" },
      quality:  { score: 68, note: "Recurring management fee revenue from stand-up MRI centers" },
      strength: { score: 70, note: "Net cash position with no meaningful debt" },
      insider:  { score: 50, note: "Founder holds controlling stake; limited open-market activity" },
    },
  },
  {
    company: "Alpha Pro Tech Ltd",
    ticker: "APT",
    marketCap: 53935448,
    score: 66.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 5.15,
    currentPrice: 5.15,
    breakdown: {
      value:    { score: 76, note: "Trades below book value; low P/E relative to building products peers" },
      quality:  { score: 60, note: "PPE and building supply products; margins normalizing post-pandemic" },
      strength: { score: 72, note: "Zero debt, significant cash on balance sheet" },
      insider:  { score: 48, note: "No notable recent insider transactions" },
    },
  },
  {
    company: "CBAK Energy Technology, Inc.",
    ticker: "CBAT",
    marketCap: 92191672,
    score: 66.2,
    dateAdded: "2026-02-21",
    priceAtAdd: 1.04,
    currentPrice: 1.04,
    breakdown: {
      value:    { score: 82, note: "Extremely low price-to-sales; deep value on asset basis" },
      quality:  { score: 52, note: "Lithium battery maker; revenue growing but margins still thin" },
      strength: { score: 58, note: "Working capital position improving but still building reserves" },
      insider:  { score: 65, note: "Management increased holdings through private placements" },
    },
  },
  {
    company: "Lifevantage Corp",
    ticker: "LFVN",
    marketCap: 62047788,
    score: 64.7,
    dateAdded: "2026-02-21",
    priceAtAdd: 4.85,
    currentPrice: 4.85,
    breakdown: {
      value:    { score: 74, note: "Low multiple on steady revenue; priced for no growth" },
      quality:  { score: 62, note: "Health supplement MLM; high gross margins but channel-dependent" },
      strength: { score: 65, note: "Low debt, consistent cash generation despite flat top line" },
      insider:  { score: 48, note: "Limited insider buying; new CEO still building position" },
    },
  },
  {
    company: "LIVE Ventures Inc",
    ticker: "LIVE",
    marketCap: 53262516,
    score: 64.5,
    dateAdded: "2026-02-21",
    priceAtAdd: 17.34,
    currentPrice: 17.34,
    breakdown: {
      value:    { score: 78, note: "Trades at deep discount to sum-of-parts across diversified holdings" },
      quality:  { score: 55, note: "Holding company with flooring, entertainment, and manufacturing assets" },
      strength: { score: 56, note: "Higher leverage from acquisitions; cash flow covers debt service" },
      insider:  { score: 62, note: "CEO holds large stake and has been a consistent buyer" },
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
      value:    { score: 70, note: "Moderate P/E for oilfield services; valuation tied to energy cycle" },
      quality:  { score: 64, note: "Completion tools specialist with good market position but cyclical" },
      strength: { score: 62, note: "Clean balance sheet for the sector; manageable capex needs" },
      insider:  { score: 52, note: "Board members hold steady positions; no recent cluster buying" },
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
