// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var inputEl= document.querySelector('#location-input');
var formEl =document.querySelector('form');
var apiKey = '36bec115901ddc1cb3dd725c6d1f7f33';

function searchHandler (event){
    event.preventDefault();

    var location = inputEl;
    
    var cityUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;

    fetch(cityUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(city){
        console.log(city)
    })
}




formEl.addEventListener('submit', searchHandler )