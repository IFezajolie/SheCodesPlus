const form = document.getElementById("form-inline");
const search = document.querySelector(".form-control");
const btn = document.getElementById("search");
const nameOutput = document.querySelector(".cityName");
const timeOutput = document.querySelector(".time");
const temp = document.querySelector(".temp");

let cityInput = "Kigali";
// Adding event listeners to the form
form.addEventListener("submit", (e) => {
  // throw an error if the input field is empty
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    // We should change from our default city to the city in search bar
    cityInput = search.value;
    // Then we should call a function to display all weather details about this city
    fetchWeatherData();
    // Remove all the text that were searched from the input field
    search.value = "";
  }
  // Preventing the default behaviour of the form
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const date = new Date(year, month - 1, day);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[date.getDay()];
}

// Function to fetch data
function fetchWeatherData() {
  // Fetching the data, and adding them dynamically with template literals
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=cade3c69512a480abfd145701231911&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      // let's start with adding the temperature
      temp.innerHTML = "☀️" + data.current.temp_c + "&#176" + "C";

      // Getting the date and time of the city, extracted as day, month, year, and time

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      // Re-formatting the page to make it more appealing with the format of 17:53 - Friday 9, 10 2021
      const dateOutput = document.querySelector(".date");
      // const dayOfWeek = dayOfTheWeek(d, m, y);
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      if ((time > "00") & (time < 12)) {
        timeOutput.innerHTML = time + " AM";
      } else {
        timeOutput.innerHTML = time + " PM";
      }

      // Adding the name of the searched city to the page
      nameOutput.innerHTML = data.location.name;

      // Setting default time of the day
      let timeOfDay = "day";

      // Getting the unique id for each weather condition
      const code = data.current.condition.code;
    })
    .catch((error) => {
      alert("City not found. Please try again.");
    });
}

fetchWeatherData();
