const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

const refreshBtn =
document.getElementById("refreshBtn");

const weatherContent =
document.getElementById("weatherContent");

const loading =
document.getElementById("loading");

const errorDiv =
document.getElementById("error");

const historyDiv =
document.getElementById("history");

let currentCity = "";

let history =
JSON.parse(
localStorage.getItem("weatherHistory")
) || [];

const weatherCodes = {

    0:["☀️","Clear Sky"],
    1:["🌤️","Mainly Clear"],
    2:["⛅","Partly Cloudy"],
    3:["☁️","Overcast"],
    45:["🌫️","Fog"],
    61:["🌧️","Rain"],
    71:["❄️","Snow"],
    95:["⛈️","Thunderstorm"]
};

const showLoading = message => {
    loading.textContent = message;
};

const clearLoading = () => {
    loading.textContent = "";
};

const getCoordinates =
async city => {

    const response =
    await fetch(
`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const data =
    await response.json();

    if(!data.results){

        throw new Error(
            "City not found"
        );
    }

    return data.results[0];
};

const getWeather =
async(lat,long)=>{

    const response =
    await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
    );

    return await response.json();
};

const saveHistory = city => {

    history =
    history.filter(
        item => item !== city
    );

    history.unshift(city);

    history =
    history.slice(0,5);

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(history)
    );

    renderHistory();
};

const renderHistory = () => {

    historyDiv.innerHTML = "";

    history.forEach(city => {

        const button =
        document.createElement("button");

        button.className =
        "history-btn";

        button.textContent =
        city;

        button.addEventListener(
            "click",
            () => fetchWeather(city)
        );

        historyDiv.appendChild(button);
    });
};

const displayWeather =
(city,data)=>{

    const weather =
    data.current_weather;

    const code =
    weather.weathercode;

    const icon =
    weatherCodes[code]?.[0] || "🌍";

    const condition =
    weatherCodes[code]?.[1] || "Unknown";

    weatherContent.innerHTML = `

    <div class="weather-content-container">
        <div class="main-weather">

            <div class="weather-icon">
                ${icon}
            </div>

            <div class="temp">
                ${weather.temperature}°
            </div>

            <div class="condition">
                ${condition}
            </div>

            <div class="city-name">
                ${city}
            </div>

        </div>

        <div class="stats">

            <div class="stat-card">
                <h4>Wind Speed</h4>
                <p>${weather.windspeed} km/h</p>
            </div>

            <div class="stat-card">
                <h4>Wind Direction</h4>
                <p>${weather.winddirection}°</p>
            </div>

            <div class="stat-card">
                <h4>Status</h4>
                <p>${condition}</p>
            </div>

            <div class="stat-card">
                <h4>Last Updated</h4>
                <p>${weather.time}</p>
            </div>

        </div>
    </div>
            

    `;
};

const fetchWeather =
async city => {

    try{

        errorDiv.textContent="";

        showLoading(
            "Loading weather..."
        );

        const location =
        await getCoordinates(city);

        const weather =
        await getWeather(
            location.latitude,
            location.longitude
        );

        currentCity =
        location.name;

        displayWeather(
            location.name,
            weather
        );

        saveHistory(
            location.name
        );
    }
    catch(error){

        weatherContent.innerHTML="";

        errorDiv.textContent =
        error.message;
    }
    finally{

        clearLoading();
    }
};

searchBtn.addEventListener(
    "click",
    ()=>{

        const city =
        cityInput.value.trim();

        if(!city){

            errorDiv.textContent =
            "Please enter a city";

            return;
        }

        fetchWeather(city);
    }
);

cityInput.addEventListener(
    "keypress",
    e=>{

        if(e.key==="Enter"){
            searchBtn.click();
        }
    }
);

refreshBtn.addEventListener(
    "click",
    ()=>{

        if(currentCity){

            fetchWeather(
                currentCity
            );
        }
    }
);

renderHistory();