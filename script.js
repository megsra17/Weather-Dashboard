
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var inputEl= document.querySelector('#location-input');
var formEl =document.querySelector('form');
var apiKey = '36bec115901ddc1cb3dd725c6d1f7f33';
var forecastEL = document.querySelector('#forecast')
var dateEl = moment().format("MM-DD-YYYY");
var pastSearch = document.querySelector('#search-area')


function searchHandler (event){
    event.preventDefault();
    var location = inputEl.value.trim();
    localStorage.setItem('city', location);
    
    currectDayForecast(location);
    fiveDayForcast(location);
}

function currectDayForecast(location){
    var cityUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + apiKey;


    fetch(cityUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(citys){
        console.log(citys)
        var cityLocalStorage = localStorage.getItem('city');
        var city = document.createElement('h3')
        var temp = document.createElement('p')
        var wind = document.createElement('p')
        var humidity = document.createElement('p')
        var weatherIcon = document.createElement('img')
        var currentDay = document.createElement('div')
        var pastInput = document.createElement('a')

        weatherIcon.src="http://openweathermap.org/img/wn/"+ citys.weather[0].icon +".png"

        pastInput.classList.add('btn-secondary')
        city.classList.add('px-3')
        city.classList.add('py-3')
        temp.classList.add('px-3')
        wind.classList.add('px-3')
        humidity.classList.add('px-3')
        currentDay.classList.add('border')
        

        city.textContent= citys.name + " " + dateEl;
       temp.textContent = "Temp: " + citys.main.temp + " F"
       wind.textContent = "Wind: " + citys.wind.speed + " MPH"
       humidity.textContent = "Humidity: " + citys.main.humidity + " %"
       pastInput.textContent = cityLocalStorage;

        forecastEL.prepend(currentDay);
        pastSearch.append(pastInput)
        currentDay.append(city)
        city.append(weatherIcon)
        currentDay.append(temp)
        currentDay.append(wind)
        currentDay.append(humidity)

        inputEl.value = ''
    })
}


function fiveDayForcast(city){

    var forcastUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ location+"&units=imperial&cnt=5&appid=" + apiKey;

    fetch(forcastUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(forcast){
        console.log(forcast)

        var fiveDay = document.createElement('div');

        fiveDay.classList.add('col')
        fiveDay.classList.add('bg-fiveday')
        fiveDay.classList.add('text-white')

    })
}




formEl.addEventListener('submit', searchHandler )