const WEATHER_API_KEY = 'SUA_CHAVE_AQUI';
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

async function fetchWeather(city) {
    const url = `${WEATHER_BASE}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Cidade não encontrada');
    return res.json();
}

async function fetchForecast(city) {
    const url = `${WEATHER_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br&cnt=40`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Previsão não disponível');
    return res.json();
}

function renderCurrentWeather(data) {
    const card = document.getElementById('weather-current');
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    card.innerHTML = `
        <h2 class="card-title">Clima Atual</h2>
        <div class="weather-main">
            <img src="${icon}" alt="${data.weather[0].description}" width="64" height="64">
            <div>
                <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                <div class="weather-desc">${data.weather[0].description}</div>
                <div class="weather-city">${data.name}, ${data.sys.country}</div>
            </div>
        </div>
        <div class="weather-details">
            <span class="weather-chip">💧 Humidade: ${data.main.humidity}%</span>
            <span class="weather-chip">💨 Vento: ${Math.round(data.wind.speed * 3.6)} km/h</span>
            <span class="weather-chip">🌡 Sensação: ${Math.round(data.main.feels_like)}°C</span>
        </div>
    `;
}

function renderForecast(data) {
    const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dailyMap = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const key = date.toDateString();
        if (!dailyMap[key]) dailyMap[key] = { date, temps: [], icons: [] };
        dailyMap[key].temps.push(item.main.temp);
        dailyMap[key].icons.push(item.weather[0].icon);
    });

    const days = Object.values(dailyMap).slice(0, 5);

    const html = days.map(d => {
        const avg = Math.round(d.temps.reduce((a, b) => a + b, 0) / d.temps.length);
        const icon = `https://openweathermap.org/img/wn/${d.icons[Math.floor(d.icons.length / 2)]}@2x.png`;
        return `
            <div class="forecast-day">
                <div class="day-name">${DAYS[d.date.getDay()]}</div>
                <img class="day-icon" src="${icon}" alt="" width="40" height="40">
                <div class="day-temp">${avg}°C</div>
            </div>
        `;
    }).join('');

    document.querySelector('#weather-forecast .forecast-container').innerHTML = html;

    return days.map(d => ({
        label: DAYS[d.date.getDay()],
        temp: Math.round(d.temps.reduce((a, b) => a + b, 0) / d.temps.length)
    }));
}
