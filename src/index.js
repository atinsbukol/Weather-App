function formatDate(date) {

let hours = date.getHours()
if (hours <10) {
  hours = `0${hours}`
}

let minutes = date.getMinutes()
if (minutes <10) {
  minutes = `0${minutes}`
}


let dayIndex = date.getDay()
let days = ["Sunday", "Monday", "Tuesday", "Wedsday", "Thursday", "Friday", "Saturday"]
let day = days[dayIndex]

  return `${day} ${hours}: ${minutes}`
}


function displayWeatherCondition(response) {
  document.querySelector("#description-id").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind-id").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity-id").innerHTML = response.data.main.humidity
  document.querySelector("#city-id").innerHTML = response.data.name;
  document.querySelector("#temperature-id").innerHTML = Math.round(response.data.main.temp);
  
}

function searchCity(city) {
//Make API call to open weathr API
  let  apiKey = "6ce66d083b4d6dddb74ba02266495c46";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCondition)

}

function handleSubmit(event) {
  event.preventDefault()
  debugger;
  //let api = "2ff29bed3181c3526c35cc5408037f85"
  let city = document.querySelector("#city-input").value
  searchCity(city)
}

function convertToFahrenheit(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector("#temperature-id");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 66
}

function convertToCelsius(event) {
  event.preventDefault()
  let temperatureElement = document.querySelector("#temperature-id");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 19;
}


function searchLocation(position) {
  //position.coords.latitude
  //position.coords.longitude
   let  apiKey = "6ce66d083b4d6dddb74ba02266495c46";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  axios.get(url).then(displayWeatherCondition)
  console.log(url)

}

function getCurrentLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(searchLocation);

}

// challenge 1
let dateElement = document.querySelector("#current-date")
currentTime = new Date()
dateElement.innerHTML= formatDate(currentTime)

// challenge 2
searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", handleSubmit)

let currentLocationButton = document.querySelector("#current-location-id")
currentLocationButton.addEventListener("click", getCurrentLocation)

searchCity("New York")



