const apiKey = "e384713163acea144b2cf401"; // Your actual API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromAmount = document.getElementById("fromAmount");
const toAmount = document.getElementById("toAmount");
const exchangeButton = document.getElementById("exchangeButton");

const currencies = [
  "USD - United States Dollar",
  "EUR - Euro",
  "GBP - British Pound Sterling",
  "CAD - Canadian Dollar",
  "AUD - Australian Dollar",
  "JPY - Japanese Yen",
  "INR - Indian Rupee",
  "CNY - Chinese Yuan",
  "CHF - Swiss Franc",
  "NZD - New Zealand Dollar",
  "SEK - Swedish Krona",
  "NOK - Norwegian Krone",
  "MXN - Mexican Peso",
  "SGD - Singapore Dollar",
  "HKD - Hong Kong Dollar",
  "KRW - South Korean Won",
  "TRY - Turkish Lira",
  "RUB - Russian Ruble",
  "ZAR - South African Rand",
  "BRL - Brazilian Real",
  "DKK - Danish Krone",
  "PLN - Polish Zloty",
  "THB - Thai Baht",
  "MYR - Malaysian Ringgit",
  "PKR - Pakistani Rupee",
];

function populateCurrencySelect(select) {
  currencies.forEach((currency) => {
    const [code, name] = currency.split(" - ");
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    select.appendChild(option);
  });
}

populateCurrencySelect(fromCurrency);
populateCurrencySelect(toCurrency);

exchangeButton.addEventListener("click", () => {
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;
  const amount = fromAmount.value;

  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  fetch(`${apiUrl}`)
    .then((response) => response.json())
    .then((data) => {
      const rate =
        data.conversion_rates[toCurrencyValue] /
        data.conversion_rates[fromCurrencyValue];
      const convertedAmount = (amount * rate).toFixed(2);
      toAmount.value = convertedAmount;
    })
    .catch((error) => console.error("Error:", error));
});
