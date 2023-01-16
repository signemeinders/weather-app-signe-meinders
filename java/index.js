function formatDate() {
  let today = new Date();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayToday = daysOfWeek[today.getDay()];
  let currentHour = today.getHours();
  let currentMinute = today.getMinutes();

  let displayDate = document.querySelector("#dateInput");
  displayDate.innerHTML = `${dayToday} ${currentHour}:${currentMinute} CST`;
}

function updateWeather(response) {
  let updatedCity = response.data.name;
  let replaceName = document.querySelector("h1");
  replaceName.innerHTML = `${updatedCity}`;

  let windspeed = Math.round(response.data.wind.speed);
  let windspeedElement = document.querySelector("#windspeed");
  windspeedElement.innerHTML = `${windspeed}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;

  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#display-temp");
  tempElement.innerHTML = `${temperature}`;

  let weatherDescription = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${weatherDescription}`;
}

function updateCity(event) {
  event.preventDefault();
  let replaceName = document.querySelector("h1");
  let newCityName = document.querySelector("#new-city");

  replaceName.innerHTML = `${newCityName.value}`;
  let unit = "imperial";

  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateWeather);
}

function newPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let unit = "imperial";
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(updateWeather);
}

function updateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(newPosition);
}

formatDate();

let form = document.querySelector("form");
form.addEventListener("submit", updateCity);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", updateLocation);

function changeTempCelsius(event) {
  event.preventDefault();
  let fixTemp = document.querySelector("#display-temp");
  fixTemp.innerHTML = `-19`;
}

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", changeTempCelsius);

function changeTempFarenheit(event) {
  event.preventDefault();
  let fixTemp = document.querySelector("#display-temp");
  fixTemp.innerHTML = `-2`;
}
//let farenheit = document.querySelector("#farenheit");
//farenheit.addEventListener("click", changeTempFarenheit);
