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

//part 4
function forecastDay(dailyStamp) {
  let date = new Date(dailyStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forcast = response.data.daily;
  console.log(response.data);
  let forecastElement = document.querySelector(".container-week");
  forecastElement.innerHTML = "";
  let forecastHTML = `<div class="row">`;
  //
  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="card" style="width: 5rem">
          <p class="card-text">${forecastDay(forcastDay.dt)}</p>
          
            <img src="http://openweathermap.org/img/wn/${
              forcastDay.weather[0].icon
            }@2x.png" />
          
          <div class="card-body">
            <p class="card-text">
              ${Math.round(forcastDay.temp.max)}° <br />
              <span class="temperature-day-min">${Math.round(
                forcastDay.temp.min
              )}°</span>
            </p>
          </div>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//displayForecast();
//console.log(displayForecast);

//part 2

function showTemperature(response) {
  console.log(response.data);

  let temperatureCelsius = Math.round(response.data.main.temp);
  console.log("temperature");
  console.log(temperatureCelsius);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temperatureCelsius;

  let humidity = Math.round(response.data.main.humidity);
  console.log("humidity");
  console.log(humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  console.log("wind");
  console.log(wind);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = wind;

  let weather = response.data.weather[0].description;
  let currentWeather = document.querySelector("#weather");
  currentWeather.innerHTML = weather;

  let currentCity = document.querySelector("h1");
  let city = response.data.name;
  currentCity.innerHTML = city;

  let timeDate = response.data.dt;
  console.log("date");
  console.log(new Date(timeDate * 1000));

  let time = document.querySelector("#currentTime");
  time.innerHTML = `Last updated: ${formatDate(timeDate * 1000)}`;
  console.log(formatDate(timeDate * 1000));

  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  console.log(iconUrl);
  let icon = document.querySelector("#mainIcon");
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", response.data.weather[0].main);
  currentLocation(response.data.coord);
}

function search(city) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

function currentLocation(position) {
  //let lat = position.data.coord.lat;
  //let lon = position.data.coord.lon;
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayForecast);
}

search("Lviv");
// call geolocation city name
//navigator.geolocation.getCurrentPosition(currentLocation);
