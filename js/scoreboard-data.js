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
  },
  {
    company: "M-tron Industries, Inc.",
    ticker: "MPTI",
    marketCap: 193102992,
    score: 73.8,
    dateAdded: "2026-02-21",
    priceAtAdd: 65.90,
    currentPrice: 65.90,
  },
  {
    company: "Virco Mfg Corporation",
    ticker: "VIRC",
    marketCap: 97403848,
    score: 73.7,
    dateAdded: "2026-02-21",
    priceAtAdd: 6.18,
    currentPrice: 6.18,
  },
  {
    company: "Core Molding Technologies Inc",
    ticker: "CMT",
    marketCap: 164377984,
    score: 72.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 18.50,
    currentPrice: 18.50,
  },
  {
    company: "FONAR Corp",
    ticker: "FONR",
    marketCap: 117110736,
    score: 68.9,
    dateAdded: "2026-02-21",
    priceAtAdd: 18.60,
    currentPrice: 18.60,
  },
  {
    company: "Alpha Pro Tech Ltd",
    ticker: "APT",
    marketCap: 53935448,
    score: 66.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 5.15,
    currentPrice: 5.15,
  },
  {
    company: "CBAK Energy Technology, Inc.",
    ticker: "CBAT",
    marketCap: 92191672,
    score: 66.2,
    dateAdded: "2026-02-21",
    priceAtAdd: 1.03,
    currentPrice: 1.03,
  },
  {
    company: "Lifevantage Corp",
    ticker: "LFVN",
    marketCap: 62047788,
    score: 64.7,
    dateAdded: "2026-02-21",
    priceAtAdd: 4.85,
    currentPrice: 4.85,
  },
  {
    company: "LIVE Ventures Inc",
    ticker: "LIVE",
    marketCap: 53262516,
    score: 64.5,
    dateAdded: "2026-02-21",
    priceAtAdd: 17.34,
    currentPrice: 17.34,
  },
  {
    company: "NCS Multistage Holdings, Inc.",
    ticker: "NCSM",
    marketCap: 101255656,
    score: 64.3,
    dateAdded: "2026-02-21",
    priceAtAdd: 38.85,
    currentPrice: 38.85,
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

    var row = document.createElement("tr");
    row.setAttribute("data-ticker", pick.ticker);
    row.innerHTML =
      '<td class="col-rank">' + (i + 1) + '</td>' +
      '<td class="col-company">' + pick.company + '</td>' +
      '<td class="col-ticker"><strong>' + pick.ticker + '</strong></td>' +
      '<td class="col-mcap">' + formatMarketCap(pick.marketCap) + '</td>' +
      '<td class="col-score">' + pick.score.toFixed(1) + '</td>' +
      '<td class="col-added">' + formatDate(pick.dateAdded) + '</td>' +
      '<td class="col-months">' + months + '</td>' +
      '<td class="col-return ' + retClass + '">' + retSign + ret.toFixed(1) + '%</td>';

    tbody.appendChild(row);
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
