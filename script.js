const currencylist = document.querySelectorAll("form select");
const convertButton = document.querySelector("form .convert-button");
const amount = document.querySelector(".amount-value input");
const currencyFrom = document.querySelector(".from-value select");
const currencyTo = document.querySelector(".to-value select");
const resultExchange = document.querySelector("form .result");
const allresultExchange = document.querySelector("form .result-all");
const reverseButton = document.querySelector("form .reverse-button");
const toggleButton = document.getElementById("toggleButton");
const apiKey = ""; //get api-key from https://app.exchangerate-api.com and paste here

for (let i = 0; i < currencylist.length; i++) {
  for (currency_title in country_list) {
    let selected = "";
    if (i == 0) {
      if (currency_title == "USD") {
        selected = "selected";
      }
    } else {
      if (currency_title == "EUR") {
        selected = "selected";
      }
    }
    let optiontag = `<option value="${currency_title}" ${selected}>${currency_title}</option>`;

    currencylist[i].insertAdjacentHTML("beforeend", optiontag);
  }
}

window.addEventListener("load", () => {
  //Loads rate when the page open
  converterValueRate();
});

convertButton.addEventListener("click", (a) => {
  //Convert Button
  a.preventDefault();
  if (resultExchange.value == "Result") {
    resultExchange.value = "";
  }
  converterValueRate();
});

toggleButton.addEventListener("click", function (event) {
  //All Exchange Rates Hide/Show Button
  event.preventDefault();
  allresultExchange.classList.toggle("hidden");
});

reverseButton.addEventListener("click", () => {
  //Reverse Button
  let exchangeValue = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = exchangeValue;
  converterValueRate();
});

function converterValueRate() {
  let amountValue = amount.value;
  if (amountValue == "" || amountValue == 0) {
    amount.value = "1";
    amountValue = 1;
  }
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyFrom.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangerate = result.conversion_rates[currencyTo.value];
      let totalExRate = (amountValue * exchangerate).toFixed(2);
      resultExchange.innerText = `${amountValue} ${currencyFrom.value} = ${totalExRate} ${currencyTo.value}`;
    });
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.conversion_rates);
      let exchangeList = document.getElementById("all-exchange-list");
      for (let prop in result.conversion_rates) {
        let li = document.createElement("li");
        li.innerText = prop + ": " + result.conversion_rates[prop];
        li.classList.add("list-group-item");
        exchangeList.appendChild(li);
      }
      for (let i = 0; i < exchangeList.children.length; i++) {
        exchangeList.children[i].remove();
      }
    });
}
