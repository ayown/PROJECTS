const today = new Date().toISOString().split("T")[0];
const BASE_URL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_nx6pqK8p5dTdVfaBN11rE24vrC0KbYWFWpJr0g1d`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);

  if (isNaN(amtVal) || amtVal <= 0) {
    msg.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    console.log(`Fetching data from URL: ${BASE_URL}`); // Debugging statement
    let response = await fetch(BASE_URL);
    console.log(`Response status: ${response.status}`); // Debugging statement

    if (!response.ok) {
      msg.innerText = "Error fetching exchange rates. Please try again.";
      return;
    }

    let data = await response.json();
    console.log("Response data:", data); // Debugging statement
    let rates = data.data;

    if (!rates[fromCurr.value] || !rates[toCurr.value]) {
      msg.innerText = "Invalid currency conversion.";
      return;
    }

    let rate = rates[toCurr.value].value / rates[fromCurr.value].value;
    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
      toCurr.value
    }`;
  } catch (error) {
    console.error("Error:", error);
    msg.innerText =
      "Something went wrong. Please check your internet connection.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
