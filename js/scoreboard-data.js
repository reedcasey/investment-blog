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
  listDate: "March 2026",
  listVersion: "beta",
};

const PICKS = [
  {
    company: "Core Molding Technologies Inc",
    ticker: "CMT",
    marketCap: 156244688,
    score: 75.5,
    dateAdded: "2026-02-21",
    priceAtAdd: 19.20,
    currentPrice: 19.72,
    breakdown: {
      value:    { score: 100, note: "Perfect valuation score; trades near book value with strong EV/EBITDA and FCF yield" },
      quality:  { score: 73, note: "Structural composites for truck/industrial; margins trending higher with improving revenue" },
      strength: { score: 84, note: "Net cash position, current ratio 2.9x; strong and consistent cashflow generation" },
      insider:  { score: 50, note: "CEO succession planned for June 2026; board holds steady positions" },
    },
  },
  {
    company: "Espey Mfg & Electronics Corp",
    ticker: "ESP",
    marketCap: 171405776,
    score: 74.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 58.05,
    currentPrice: 57.93,
    breakdown: {
      value:    { score: 91, note: "Strong valuation at 9.1/10; supported by healthy FCF yield despite higher P/B" },
      quality:  { score: 84, note: "Defense/power electronics niche; 23% operating margins, high ROIC, top margin trend" },
      strength: { score: 75, note: "No long-term debt, current ratio 2.5x; perfect cashflow trend score of 10/10" },
      insider:  { score: 50, note: "Some insider selling noted; management holds meaningful equity; $135M backlog" },
    },
  },
  {
    company: "CareCloud, Inc.",
    ticker: "CCLD",
    marketCap: 103872752,
    score: 70.8,
    dateAdded: "2026-03-02",
    priceAtAdd: 2.52,
    currentPrice: 2.52,
    breakdown: {
      value:    { score: 86, note: "Deep value at low EV/EBITDA with exceptional FCF yield; top valuation tier" },
      quality:  { score: 47, note: "Healthcare SaaS platform; margins improving but revenue trend weak from M&A integration" },
      strength: { score: 82, note: "Strong cashflow generation offsets moderate balance sheet leverage from acquisitions" },
      insider:  { score: 50, note: "New CEO Jan 2026; $3.8M kickback settlement resolved; AI product launches underway" },
    },
  },
  {
    company: "Optex Systems Holdings Inc",
    ticker: "OPXS",
    marketCap: 89838784,
    score: 70.3,
    dateAdded: "2026-03-02",
    priceAtAdd: 12.95,
    currentPrice: 12.95,
    breakdown: {
      value:    { score: 100, note: "Perfect valuation score; premium P/B offset by strong FCF yield metrics" },
      quality:  { score: 81, note: "Optical instruments for defense; strong revenue trend and margins, 21% ROIC" },
      strength: { score: 54, note: "Good cashflow but balance sheet lighter; current ratio adequate for defense contractor" },
      insider:  { score: 50, note: "Stable defense contract pipeline; Altman Z-Score 12.01 signals financial health" },
    },
  },
  {
    company: "Flexsteel Industries Inc",
    ticker: "FLXS",
    marketCap: 275133472,
    score: 69.0,
    dateAdded: "2026-03-02",
    priceAtAdd: 36.11,
    currentPrice: 36.11,
    breakdown: {
      value:    { score: 100, note: "Near-perfect valuation; P/B 1.6x with strong FCF yield at current depressed price" },
      quality:  { score: 75, note: "Household furniture maker; 23% gross margins improving, 11% ROIC, solid margin trend" },
      strength: { score: 57, note: "Net cash position, current ratio 3.0x; balance sheet adequate but not fortress-tier" },
      insider:  { score: 50, note: "Q2 FY2026 strong (+9% sales growth); tariff risk flagged as watch item" },
    },
  },
  {
    company: "Alpha Pro Tech Ltd",
    ticker: "APT",
    marketCap: 54563820,
    score: 67.2,
    dateAdded: "2026-02-21",
    priceAtAdd: 5.15,
    currentPrice: 5.04,
    breakdown: {
      value:    { score: 86, note: "Trades below book value (P/B 0.86); solid FCF yield with zero dilution" },
      quality:  { score: 43, note: "PPE and building supply products; 38% gross margins but modest ROIC and weak revenue trend" },
      strength: { score: 69, note: "Zero debt, strong cashflow; current ratio 14.1x — fortress balance sheet" },
      insider:  { score: 50, note: "Active share buyback program ($2.7M remaining); no notable insider transactions" },
    },
  },
  {
    company: "NCS Multistage Holdings, Inc.",
    ticker: "NCSM",
    marketCap: 101230256,
    score: 64.3,
    dateAdded: "2026-02-21",
    priceAtAdd: 39.85,
    currentPrice: 39.26,
    breakdown: {
      value:    { score: 94, note: "Trades below book value with strong FCF yield; top-tier valuation score" },
      quality:  { score: 48, note: "Oil & gas completion tools; lower margins but stable cyclical operator" },
      strength: { score: 70, note: "Clean balance sheet, current ratio 4.4x, net cash position; solid debt profile" },
      insider:  { score: 50, note: "Acquired ResMetrics; earnings report due March 9, 2026" },
    },
  },
  {
    company: "MIND Technology, Inc.",
    ticker: "MIND",
    marketCap: 68779808,
    score: 64.1,
    dateAdded: "2026-03-02",
    priceAtAdd: 8.86,
    currentPrice: 8.86,
    breakdown: {
      value:    { score: 100, note: "Perfect valuation score; deeply discounted with strong metrics across the board" },
      quality:  { score: 68, note: "Oceanographic/defense technology; improving margins and solid revenue trend" },
      strength: { score: 30, note: "Weak balance sheet and cashflow scores; $19.4M cash but limited financial cushion" },
      insider:  { score: 50, note: "Zero dilution; debt-free; Altman Z-Score 3.25 signals adequate health" },
    },
  },
  {
    company: "SIFCO Industries Inc",
    ticker: "SIF",
    marketCap: 86949640,
    score: 62.5,
    dateAdded: "2026-03-02",
    priceAtAdd: 13.15,
    currentPrice: 13.15,
    breakdown: {
      value:    { score: 85, note: "Moderate EV/EBITDA offset by strong FCF yield; solid valuation score" },
      quality:  { score: 62, note: "Aircraft engine forgings; margins improving as turnaround gains traction" },
      strength: { score: 52, note: "Manageable leverage, current ratio 1.7x; cashflow generation mixed but improving" },
      insider:  { score: 50, note: "Q1 FY2026 beat: +14.8% revenue, $0.29 EPS; turnaround inflecting to profitability" },
    },
  },
  {
    company: "Weyco Group Inc",
    ticker: "WEYS",
    marketCap: 298578112,
    score: 62.5,
    dateAdded: "2026-03-02",
    priceAtAdd: 31.89,
    currentPrice: 31.89,
    breakdown: {
      value:    { score: 85, note: "Attractive valuation with solid FCF yield; well-priced for a steady dividend payer" },
      quality:  { score: 35, note: "Wholesale footwear (Florsheim, BOGS, Stacy Adams); weak revenue trend but stable margins" },
      strength: { score: 57, note: "Adequate balance sheet and cashflow; moderate leverage with consistent dividend" },
      insider:  { score: 50, note: "Special dividend paid recently; upgraded to Buy by Wall Street Zen March 2026" },
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
