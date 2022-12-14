var inputEl = document.querySelector("#location-input");
var formEl = document.querySelector("form");
var apiKey = "36bec115901ddc1cb3dd725c6d1f7f33";
var forecastEL = document.querySelector("#forecast");
var currentDayEl = document.querySelector("#currentDay");
var dateEl = moment().format("MM-DD-YYYY");
var fiveForcast = document.querySelector("#rowEl");
var pastSearch = document.querySelector("#search-area");

//stores searched cities in local storage
var pastSearchCities = JSON.parse(localStorage.getItem("cities")) || [];

for (var i = 0; i < pastSearchCities.length; i++) {
  renderPastCitiesBtn(pastSearchCities[i]);
}

var pastLocation = localStorage.getItem("city");
if (pastLocation) {
  currectDayForecast(pastLocation);
  fiveDayForcast(pastLocation);
}

//search function for app
function searchHandler(event) {
  event.preventDefault();
  var location = inputEl.value.trim();

  localStorage.setItem("cities", JSON.stringify(pastSearchCities));
  localStorage.setItem("city", location);

  currectDayForecast(location);
  fiveDayForcast(location);
}

//loades last cities
function renderPastCitiesBtn(location) {
  var pastInput = document.createElement("button");

  pastInput.type = "button";
  pastInput.classList.add("btn-secondary");
  pastInput.textContent = location;
  pastSearch.append(pastInput);

  pastInput.addEventListener("click", function () {
    txt = "";
    var txt = this.innerHTML;
    currectDayForecast(txt);
    fiveDayForcast(txt);
  });
}
//gets current forecast
function currectDayForecast(location) {
  var cityUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&units=imperial&appid=" +
    apiKey;

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (citys) {
      currentDayEl.innerHTML = "";

      console.log(citys);
      var cityLocalStorage = localStorage.getItem("city");
      var city = document.createElement("h3");
      var temp = document.createElement("p");
      var wind = document.createElement("p");
      var humidity = document.createElement("p");
      var weatherIcon = document.createElement("img");
      var currentDay = document.createElement("div");

      weatherIcon.src =
        "https://openweathermap.org/img/wn/" + citys.weather[0].icon + ".png";

      city.classList.add("px-3");
      city.classList.add("py-3");
      temp.classList.add("px-3");
      wind.classList.add("px-3");
      humidity.classList.add("px-3");
      currentDay.classList.add("border");

      city.textContent = citys.name + " " + dateEl;
      temp.textContent = "Temp: " + citys.main.temp + " F";
      wind.textContent = "Wind: " + citys.wind.speed + " MPH";
      humidity.textContent = "Humidity: " + citys.main.humidity + " %";

      currentDayEl.prepend(currentDay);

      currentDay.append(city);
      city.append(weatherIcon);
      currentDay.append(temp);
      currentDay.append(wind);
      currentDay.append(humidity);

      if (!pastSearchCities.includes(cityLocalStorage)) {
        renderPastCitiesBtn(cityLocalStorage);
      }
      console.log(
        pastSearchCities,
        cityLocalStorage,
        !pastSearchCities.includes(cityLocalStorage)
      );
      pastSearchCities.push(cityLocalStorage);
      inputEl.value = "";
    })
    .catch((error) => {
      alert("Error 404: Not Found");
      inputEl.value("");
    });
}

//gets five day forecast
function fiveDayForcast(location) {
  var forcastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    location +
    "&units=imperial&appid=" +
    apiKey;

  fetch(forcastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (forcast) {
      fiveForcast.innerHTML = " ";
      console.log(forcast);
      for (var i = 2; i < forcast.list.length; i += 8) {
        var fiveDay = document.createElement("div");
        var date = document.createElement("p");
        var temp = document.createElement("p");
        var wind = document.createElement("p");
        var humidity = document.createElement("p");
        var weatherIcon = document.createElement("img");

        weatherIcon.src =
          "https://openweathermap.org/img/wn/" +
          forcast.list[i].weather[0].icon +
          ".png";

        date.classList.add("px-3");
        temp.classList.add("px-3");
        wind.classList.add("px-3");
        humidity.classList.add("px-3");
        fiveDay.classList.add("col");
        fiveDay.classList.add("bg-fiveday");
        fiveDay.classList.add("text-white");
        fiveDay.classList.add("py-3");

        date.textContent = moment.unix(forcast.list[i].dt).format("MM-DD-YYYY");
        temp.textContent = "Temp: " + forcast.list[i].main.temp + " F";
        wind.textContent = "Wind: " + forcast.list[i].wind.speed + " MPH";
        humidity.textContent =
          "Humidity: " + forcast.list[i].main.humidity + " %";

        fiveForcast.append(fiveDay);
        fiveDay.append(date);
        fiveDay.append(weatherIcon);
        fiveDay.append(temp);
        fiveDay.append(wind);
        fiveDay.append(humidity);
      }
    });
}

formEl.addEventListener("submit", searchHandler);
