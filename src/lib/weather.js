const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_BASE    = import.meta.env.VITE_WEATHER_BASE;

export async function fetchWeather(city) {
    const res = await fetch(`${WEATHER_BASE}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`);
    if (!res.ok) throw new Error('Cidade não encontrada');
    return res.json();
}

export async function fetchForecast(city) {
    const res = await fetch(`${WEATHER_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br&cnt=40`);
    if (!res.ok) throw new Error('Previsão não disponível');
    return res.json();
}

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function processForecast(data) {
    const dailyMap = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const key  = date.toDateString();
        if (!dailyMap[key]) dailyMap[key] = { date, temps: [], icons: [] };
        dailyMap[key].temps.push(item.main.temp);
        dailyMap[key].icons.push(item.weather[0].icon);
    });
    return Object.values(dailyMap).slice(0, 5).map(d => ({
        label: DAYS[d.date.getDay()],
        temp:  Math.round(d.temps.reduce((a, b) => a + b) / d.temps.length),
        icon:  d.icons[Math.floor(d.icons.length / 2)],
    }));
}
