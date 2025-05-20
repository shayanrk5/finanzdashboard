const API_KEY = "cdbde914335f42bd8b77f64e91c10e49";
const stocks = ["AAPL", "MSFT", "TSLA", "AMZN", "GOOGL", "NVDA", "META"];

async function loadStocks() {
  const container = document.getElementById("stockCards");
  for (const symbol of stocks) {
    try {
      const res = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${API_KEY}`);
      const data = await res.json();

      const values = data.values.slice(0, 7).reverse();
      const prices = values.map(v => parseFloat(v.close));
      const latest = prices[6];
      const oldest = prices[0];
      const percentChange = (((latest - oldest) / oldest) * 100).toFixed(2);
      const sign = percentChange >= 0 ? '+' : '';
      const className = percentChange >= 0 ? 'up' : 'down';

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${symbol}</h3>
        <div class="price">$${latest} <span class="${className}">${sign}${percentChange}%</span></div>
      `;
      container.appendChild(card);
    } catch (error) {
      console.error("Fehler beim Laden der Daten für", symbol, error);
    }
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

window.onload = loadStocks;
