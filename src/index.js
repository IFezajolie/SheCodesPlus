const form = document.getElementById("form-inline");
const search = document.querySelector(".form-control");
const btn = document.getElementById("search");
const nameOutput = document.querySelector(".cityName");
const timeOutput = document.querySelector(".time");
const temp = document.querySelector(".temp");

let cityInput = "Kigali";

// Function to get weather emoji based on temperature
function getWeatherEmoji(temperature) {
  if (temperature > 0 && temperature <= 9) {
    return "❄️"; // Cold, snowy weather
  } else if (temperature > 9 && temperature <= 19) {
    return "☁️"; // Cool or mild weather
  } else {
    return "🌥️"; // Warm or hot weather
  }
}

// Function to fetch data
function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=cade3c69512a480abfd145701231911&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Get weather emoji based on temperature
      const emoji = getWeatherEmoji(data.current.temp_c);

      // Update the temperature display with the emoji
      temp.innerHTML = `${emoji} ${data.current.temp_c}°C`;

      // Getting the date and time of the city
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      // Re-formatting the page to make it more appealing
      const dateOutput = document.querySelector(".date");
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      if ((time > "00") & (time < 12)) {
        timeOutput.innerHTML = time + " AM";
      } else {
        timeOutput.innerHTML = time + " PM";
      }

      // Add the name of the searched city to the page
      nameOutput.innerHTML = data.location.name;
    })
    .catch((error) => {
      alert("City not found. Please try again.");
    });
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
  }
  e.preventDefault();
});

// Function to get the day of the week
function dayOfTheWeek(day, month, year) {
  const date = new Date(year, month - 1, day);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

// Initial fetch on page load
fetchWeatherData();