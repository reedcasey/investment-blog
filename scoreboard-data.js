/* ==========================================
   Scoreboard Data — Allegory of the Trade
   ==========================================

   To update the list:
   1. Edit the PICKS array below
   2. Each pick needs: company, ticker, marketCap, score, dateAdded, priceAtAdd, currentPrice
   3. Returns and months are calculated automatically
   4. Rank is determined by array order (index + 1)

   marketCap format: number in dollars (will be formatted to "$XXM")
   score: composite score from the screener (0-100)
   priceAtAdd: closing price on the date of inclusion
   currentPrice: latest known price (update regularly or replace with live feed later)
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
    priceAtAdd: 52.41,
    currentPrice: 52.41,
  },
  {
    company: "M-tron Industries, Inc.",
    ticker: "MPTI",
    marketCap: 193102992,
    score: 73.8,
    dateAdded: "2026-02-21",
    priceAtAdd: 65.69,
    currentPrice: 65.69,
  },
  {
    company: "Virco Mfg Corporation",
    ticker: "VIRC",
    marketCap: 97403848,
    score: 73.7,
    dateAdded: "2026-02-21",
    priceAtAdd: 6.28,
    currentPrice: 6.28,
  },
  {
    company: "Core Molding Technologies Inc",
    ticker: "CMT",
    marketCap: 164377984,
    score: 72.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 20.06,
    currentPrice: 20.06,
  },
  {
    company: "FONAR Corp",
    ticker: "FONR",
    marketCap: 117110736,
    score: 68.9,
    dateAdded: "2026-02-21",
    priceAtAdd: 18.55,
    currentPrice: 18.55,
  },
  {
    company: "Alpha Pro Tech Ltd",
    ticker: "APT",
    marketCap: 53935448,
    score: 66.4,
    dateAdded: "2026-02-21",
    priceAtAdd: 5.17,
    currentPrice: 5.17,
  },
  {
    company: "CBAK Energy Technology, Inc.",
    ticker: "CBAT",
    marketCap: 92191672,
    score: 66.2,
    dateAdded: "2026-02-21",
    priceAtAdd: 1.00,
    currentPrice: 1.00,
  },
  {
    company: "Lifevantage Corp",
    ticker: "LFVN",
    marketCap: 62047788,
    score: 64.7,
    dateAdded: "2026-02-21",
    priceAtAdd: 6.09,
    currentPrice: 6.09,
  },
  {
    company: "LIVE Ventures Inc",
    ticker: "LIVE",
    marketCap: 53262516,
    score: 64.5,
    dateAdded: "2026-02-21",
    priceAtAdd: 4.81,
    currentPrice: 4.81,
  },
  {
    company: "NCS Multistage Holdings, Inc.",
    ticker: "NCSM",
    marketCap: 101255656,
    score: 64.3,
    dateAdded: "2026-02-21",
    priceAtAdd: 38.08,
    currentPrice: 38.08,
  },
];


/* ==========================================
   RENDERING — don't edit below unless
   changing the table structure
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

document.addEventListener("DOMContentLoaded", renderScoreboard);
