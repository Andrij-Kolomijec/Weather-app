const img = document.querySelector("img");
const searchButton = document.querySelector("#search-button");
const degrees = "c";
const speed = "kph";
const gauge = "mm";
const distance = "km";

async function fetchGif(input = "sky") {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=7wKVqKRF01bWdUJTDZtEo3GE0E3tpNaN&s=${input}_weather`,
      { mode: "cors" },
    );
    const data = await response.json();
    if (response.status !== 200) {
      console.log("Server gif error!", data);
    } else {
      img.src = data.data.images.original.url;
    }
  } catch (error) {
    console.log("Fetch gif error!", error);
  }
}

export default async function fetchWeatherData(input = "Barcelona") {
  const country = document.querySelector("#country");
  const localtime = document.querySelector("#localtime");
  const name = document.querySelector("#name");
  const condition = document.querySelector("#condition");
  const temp = document.querySelector("#temp");
  const feelslike = document.querySelector("#feelslike");
  const wind = document.querySelector("#wind");
  const pressure = document.querySelector("#pressure");
  const humidity = document.querySelector("#humidity");
  const precip = document.querySelector("#precip");
  const vis = document.querySelector("#vis");
  const uv = document.querySelector("#uv");
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=750de696050f49b8abb83741230311&q=${input}`,
      { mode: "cors" },
    );
    const data = await response.json();
    if (response.status !== 200) {
      console.log("Server weather error!", data);
    } else {
      country.innerText = data.location.country;
      name.innerText = data.location.name;
      localtime.innerText = data.location.localtime.slice(11);
      condition.innerText = data.current.condition.text;
      temp.innerText = `${data.current[`temp_${degrees}`]}°C`;
      feelslike.innerText = `${data.current[`feelslike_${degrees}`]}°C`;
      wind.innerText = `${data.current[`wind_${speed}`]}${speed} from ${
        data.current.wind_dir
      }`;
      pressure.innerText = `${data.current.pressure_mb}hPa`;
      humidity.innerText = `${data.current.humidity}%`;
      precip.innerText = `${data.current[`precip_${gauge}`]}${gauge}`;
      vis.innerText = `${data.current[`vis_${distance}`] + distance}`;
      uv.innerText = `${data.current.uv}`;
    }
    fetchGif(data.current.condition.text);
  } catch (error) {
    console.log("Fetch weather error!", error);
  }
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.querySelector("input").value;
  fetchWeatherData(input);
  document.querySelector("input").value = "";
});
