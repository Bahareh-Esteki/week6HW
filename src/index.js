let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
let now = new Date();
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
let weekDay = document.querySelector(".todayWeather");
let hour = now.getHours();
let minute = now.getMinutes();
weekDay.innerHTML = `${day}   ${hour}:${minute} <br/> `;
function handleposition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(findCity);
}
function showcurrent() {
  navigator.geolocation.getCurrentPosition(handleposition);
}

function findCity(response) {
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}<sup>o</sup>C`;
  console.log(response.data);
  let maxTemp = document.querySelector(".todayMax");
  let minTemp = document.querySelector(".todayMin");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let descrp = document.querySelector("#descrp");
  descrp.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} MPH`;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}<sup>o</sup>C`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}<sup>o</sup>C`;
  let city = document.querySelector(".cityName");
  city.innerHTML = response.data.name;
}

function search() {
  let cityName = document.querySelector("#enterCity").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(findCity);
}

let form = document.querySelector("#enterCity");
form.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    search();
  }
});
let searchCity = document.querySelector(".btn");
searchCity.addEventListener("click", search);

let current = document.querySelector("#currentCity");
current.addEventListener("click", showcurrent);
