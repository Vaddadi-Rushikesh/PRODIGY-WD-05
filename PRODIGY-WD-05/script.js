document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "7e2a9b314f44c39795a2decc85d85361";
    const searchButton = document.querySelector(".search-bar button");
    const searchInput = document.querySelector(".search-bar input");
    const temperatureElement = document.querySelector(".temperature");
    const descriptionElement = document.querySelector(".description");
    const humidityElement = document.querySelector(".info-humidity span");
    const windElement = document.querySelector(".info-wind span");
    const weatherImage = document.querySelector(".weather img");

    searchButton.addEventListener("click", () => {
        const location = searchInput.value;
        if (location) {
            fetchWeather(location);
        } else {
            alert("Please enter a location");
        }
    });

    function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        console.log(`Fetching weather data from: ${url}`);

        fetch(url)
            .then(response => {
                console.log('Response received:', response);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data);
                if (data.cod === 200) {
                    updateUI(data);
                } else {
                    alert("Location not found!");
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("Error fetching weather data!");
            });
    }

    function updateUI(data) {
        const { temp } = data.main;
        const { description, icon } = data.weather[0];
        const { humidity } = data.main;
        const { speed } = data.wind;

        console.log(`Updating UI with data: temp=${temp}, description=${description}, humidity=${humidity}, speed=${speed}`);

        temperatureElement.innerHTML = `${Math.round(temp)}<span>°C</span>`;
        descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
        humidityElement.textContent = `${humidity}%`;
        windElement.textContent = `${speed}Km/h`;

        weatherImage.src = `http://openweathermap.org/img/wn/${icon}@2x.png`; // Use @2x for better quality
        weatherImage.alt = description;
    }
});
