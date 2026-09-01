// ---------------------------------------------
// Hardcoded stock prices
// ---------------------------------------------
const STOCK_PRICES = {
  AAPL: 180,
  TSLA: 250,
  GOOGL: 140,
  AMZN: 145,
  MSFT: 410,
  NFLX: 670,
  META: 500,
};

// In-memory portfolio: { SYMBOL: quantity }
let portfolio = {};

// ---------------------------------------------
// Elements
// ---------------------------------------------
const symbolSelect = document.getElementById('symbol');
const quantityInput = document.getElementById('quantity');
const addForm = document.getElementById('add-form');
const formError = document.getElementById('form-error');
const holdingsBody = document.getElementById('holdings-body');
const emptyState = document.getElementById('empty-state');
const totalValueEl = document.getElementById('total-value');
const exportCsvBtn = document.getElementById('export-csv');
const exportTxtBtn = document.getElementById('export-txt');

// ---------------------------------------------
// Setup: populate symbol dropdown
// ---------------------------------------------
function populateSymbolOptions() {
  Object.keys(STOCK_PRICES).forEach((symbol) => {
    const option = document.createElement('option');
    option.value = symbol;
    option.textContent = `${symbol} — $${STOCK_PRICES[symbol].toFixed(2)}`;
    symbolSelect.appendChild(option);
  });
}

// ---------------------------------------------
// Formatting helpers
// ---------------------------------------------
function formatCurrency(amount) {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatQuantity(qty) {
  return qty.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

// ---------------------------------------------
// Core calculations
// ---------------------------------------------
function getDetails() {
  return Object.entries(portfolio).map(([symbol, qty]) => {
    const price = STOCK_PRICES[symbol];
    const value = price * qty;
    return { symbol, qty, price, value };
  });
}

function getTotal(details) {
  return details.reduce((sum, row) => sum + row.value, 0);
}

// ---------------------------------------------
// Rendering
// ---------------------------------------------
function render() {
  const details = getDetails();
  holdingsBody.innerHTML = '';

  if (details.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    details.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="col-symbol">${row.symbol}</td>
        <td class="col-qty">${formatQuantity(row.qty)}</td>
        <td class="col-price">${formatCurrency(row.price)}</td>
        <td class="col-value">${formatCurrency(row.value)}</td>
        <td class="col-remove">
          <button class="remove-btn" data-symbol="${row.symbol}" aria-label="Remove ${row.symbol}">×</button>
        </td>
      `;
      holdingsBody.appendChild(tr);
    });
  }

  totalValueEl.textContent = formatCurrency(getTotal(details));
}

// ---------------------------------------------
// Event handlers
// ---------------------------------------------
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formError.textContent = '';

  const symbol = symbolSelect.value;
  const qty = parseFloat(quantityInput.value);

  if (!symbol || !(symbol in STOCK_PRICES)) {
    formError.textContent = 'Choose a valid symbol.';
    return;
  }

  if (isNaN(qty) || qty <= 0) {
    formError.textContent = 'Quantity must be a positive number.';
    return;
  }

  portfolio[symbol] = (portfolio[symbol] || 0) + qty;
  quantityInput.value = '';
  render();
});

holdingsBody.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-btn');
  if (!btn) return;
  const symbol = btn.dataset.symbol;
  delete portfolio[symbol];
  render();
});

// ---------------------------------------------
// Export: CSV
// ---------------------------------------------
exportCsvBtn.addEventListener('click', () => {
  const details = getDetails();
  if (details.length === 0) return;

  const total = getTotal(details);
  let csv = 'Symbol,Quantity,Price,Value\n';
  details.forEach((row) => {
    csv += `${row.symbol},${row.qty},${row.price.toFixed(2)},${row.value.toFixed(2)}\n`;
  });
  csv += `\nTotal Investment,,,${total.toFixed(2)}\n`;

  downloadFile(csv, 'portfolio.csv', 'text/csv');
});

// ---------------------------------------------
// Export: TXT
// ---------------------------------------------
exportTxtBtn.addEventListener('click', () => {
  const details = getDetails();
  if (details.length === 0) return;

  const total = getTotal(details);
  let txt = 'Portfolio Summary\n';
  txt += `${'Symbol'.padEnd(8)}${'Qty'.padEnd(10)}${'Price'.padEnd(10)}${'Value'.padEnd(10)}\n`;
  details.forEach((row) => {
    txt += `${row.symbol.padEnd(8)}${String(row.qty).padEnd(10)}${row.price.toFixed(2).padEnd(10)}${row.value.toFixed(2).padEnd(10)}\n`;
  });
  txt += '-'.repeat(36) + '\n';
  txt += `Total Investment Value: ${formatCurrency(total)}\n`;

  downloadFile(txt, 'portfolio.txt', 'text/plain');
});

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------------------------------------
// Init
// ---------------------------------------------
populateSymbolOptions();
render();