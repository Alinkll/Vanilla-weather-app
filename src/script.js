function formatDate(timeTemp) {
  let now = new Date(timeTemp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

//part 2

function showTemperature(response) {
  console.log(response.data);

  temperatureCelsius = Math.round(response.data.temperature.current);
  console.log("temperature");
  console.log(temperatureCelsius);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temperatureCelsius;

  let humidity = Math.round(response.data.temperature.humidity);
  console.log("humidity");
  console.log(humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  console.log("wind");
  console.log(wind);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = wind;

  let weather = response.data.condition.description;
  let currentWeather = document.querySelector("#weather");
  currentWeather.innerHTML = weather;

  let currentCity = document.querySelector("h1");
  let city = response.data.city;
  currentCity.innerHTML = city;

  let timeDate = response.data.time;
  console.log("date");
  console.log(new Date(timeDate * 1000));

  let time = document.querySelector("#currentTime");
  time.innerHTML = `Last updated: ${formatDate(timeDate * 1000)}`;
  console.log(formatDate(timeDate * 1000));

  let iconUrl = response.data.condition.icon_url;
  console.log(iconUrl);
  let icon = document.querySelector("#mainIcon");
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
  let apiKey = "38f1ad1fb044ff296o28b24b99beet74";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  console.log(cityName.value);

  search(cityName.value);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", city);

//part 3

let temperatureCelsius = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((temperatureCelsius * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit-link");

fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperatureCelsius;
}

let celsius = document.querySelector("#celsius-link");

celsius.addEventListener("click", convertToCelsius);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "38f1ad1fb044ff296o28b24b99beet74";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(currentLocation);
