const API_KEY = "4eecb18a1c4c05464830b5bb5c254a64";

// getting dom elements
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const cityName = document.querySelector(".city-name");
const country = document.querySelector(".country");
const not_found = document.querySelector(".not-found");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

// fetching data from api
const getData = async (city = "Tashkent") => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

// rendering data to dom
const renderData = async () => {
  const data = await getData(searchInput.value);
  if (data.cod === "404") {
    not_found.textContent = data.message;
    not_found.classList.add("show");
    cityName.textContent = "";
    weatherIcon.src = "";
    temp.innerHTML = "";
    weather.classList.remove("show");
  } else if (data.name) {
    not_found.classList.remove("show");
    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    weatherIcon.src = `./assets/${data.weather[0].main.toLowerCase()}.png`;
    temp.textContent = (data.main.temp - 273.15).toFixed(1);
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = `${data.wind.speed} km/h`;

    weather.classList.add("show");
  }
};
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    renderData();
  }
});
searchBtn.addEventListener("click", renderData);
