const BIN_ID  = import.meta.env.VITE_JSONBIN_ID;
const BIN_KEY = import.meta.env.VITE_JSONBIN_KEY;
const API     = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HEADERS = {
    'Content-Type': 'application/json',
    'X-Master-Key': BIN_KEY,
};

export async function saveSearch(weatherData) {
    try {
        const current = await loadHistory();
        const entry = {
            id:          crypto.randomUUID(),
            city:        weatherData.name,
            country:     weatherData.sys.country,
            temp:        Math.round(weatherData.main.temp),
            description: weatherData.weather[0].description,
            icon:        weatherData.weather[0].icon,
            timestamp:   new Date().toISOString(),
        };
        await fetch(API, {
            method:  'PUT',
            headers: HEADERS,
            body:    JSON.stringify([entry, ...current].slice(0, 20)),
        });
    } catch (err) {
        console.warn('JSONBin write failed:', err.message);
    }
}

export async function loadHistory() {
    try {
        const res  = await fetch(`${API}/latest`, { headers: { 'X-Master-Key': BIN_KEY } });
        const data = await res.json();
        return Array.isArray(data.record) ? data.record : [];
    } catch (err) {
        console.warn('JSONBin read failed:', err.message);
        return [];
    }
}
