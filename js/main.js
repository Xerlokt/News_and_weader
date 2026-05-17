import Chart from 'chart.js/auto';
import { fetchWeather, fetchForecast, renderCurrentWeather, renderForecast } from './weather.js';
import { fetchNews, renderNews } from './news.js';

let tempChart = null;

function renderTempChart(days) {
    const ctx = document.getElementById('temp-chart').getContext('2d');

    if (tempChart) tempChart.destroy();

    tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days.map(d => d.label),
            datasets: [{
                label: 'Temperatura (°C)',
                data: days.map(d => d.temp),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.1)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#3b82f6',
                tension: 0.3,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    ticks: { callback: v => `${v}°` },
                    grid: { color: '#f0f0f0' }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

async function search(city) {
    try {
        const [weatherData, forecastData] = await Promise.all([
            fetchWeather(city),
            fetchForecast(city)
        ]);

        renderCurrentWeather(weatherData);
        const days = renderForecast(forecastData);
        renderTempChart(days);

        saveToFavorites(city);
    } catch (err) {
        document.getElementById('weather-current').innerHTML =
            `<h2 class="card-title">Clima Atual</h2><p class="state-msg">⚠️ ${err.message}</p>`;
    }
}

function saveToFavorites(city) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(city)) {
        favorites.unshift(city);
        localStorage.setItem('favorites', JSON.stringify(favorites.slice(0, 5)));
    }
}

function init() {
    fetchNews().then(renderNews).catch(() => {
        document.getElementById('news-container').innerHTML =
            '<p class="state-msg">⚠️ Notícias indisponíveis no momento.</p>';
    });

    const lastCity = JSON.parse(localStorage.getItem('favorites') || '[]')[0];
    if (lastCity) search(lastCity);

    document.getElementById('search-btn').addEventListener('click', () => {
        const city = document.getElementById('city-input').value.trim();
        if (city) search(city);
    });

    document.getElementById('city-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('search-btn').click();
    });

    document.getElementById('hamburger').addEventListener('click', () => {
        document.querySelector('.nav-search').classList.toggle('open');
    });
}

document.addEventListener('DOMContentLoaded', init);
