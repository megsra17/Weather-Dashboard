// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var inputEl= document.querySelector('#location-input');
var formEl =document.querySelector('form');
var apiKey = '36bec115901ddc1cb3dd725c6d1f7f33';
var forecastEL = document.querySelector('#forecast')
var currentDayEl = document.querySelector('#currentDay')
var dateEl = moment().format("MM-DD-YYYY");
var fiveForcast = document.querySelector('#rowEl')
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
        currentDayEl.innerHTML = '';
        console.log(citys)
        var cityLocalStorage = localStorage.getItem('city');
        var city = document.createElement('h3')
        var temp = document.createElement('p')
        var wind = document.createElement('p')
        var humidity = document.createElement('p')
        var weatherIcon = document.createElement('img')
        var currentDay = document.createElement('div')
        var pastInput = document.createElement('button')

        function pastLocation (event){
            event.preventDefault();
        }
       

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

        currentDayEl.prepend(currentDay);
        pastSearch.append(pastInput)
        currentDay.append(city)
        city.append(weatherIcon)
        currentDay.append(temp)
        currentDay.append(wind)
        currentDay.append(humidity)

        inputEl.value = ''
    })
}


function fiveDayForcast(location){
   

var forcastUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+location+"&units=imperial&appid=" + apiKey;

    fetch(forcastUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(forcast){
         fiveForcast.innerHTML = " ";
        console.log(forcast)
        for (var i = 2; i < forcast.list.length; i+=8){
             var fiveDay = document.createElement('div');
             var date = document.createElement('p')
            var temp = document.createElement('p')
            var wind = document.createElement('p')
            var humidity = document.createElement('p')
            var weatherIcon = document.createElement('img')

            weatherIcon.src="http://openweathermap.org/img/wn/"+ forcast.list[i].weather[0].icon +".png"

            date.classList.add('px-3')
            temp.classList.add('px-3')
            wind.classList.add('px-3')
            humidity.classList.add('px-3')
            fiveDay.classList.add('col')
            fiveDay.classList.add('bg-fiveday')
            fiveDay.classList.add('text-white')
            fiveDay.classList.add('py-3')

            date.textContent = moment.unix(forcast.list[i].dt).format("MM-DD-YYYY")
            temp.textContent = "Temp: " + forcast.list[i].main.temp + " F"
            wind.textContent = "Wind: " + forcast.list[i].wind.speed + " MPH"
            humidity.textContent = "Humidity: " + forcast.list[i].main.humidity + " %"

            fiveForcast.append(fiveDay);
            fiveDay.append(date);
            fiveDay.append(weatherIcon);
            fiveDay.append(temp);
            fiveDay.append(wind);
            fiveDay.append(humidity);
        }
       

    })
}




formEl.addEventListener('submit', searchHandler )