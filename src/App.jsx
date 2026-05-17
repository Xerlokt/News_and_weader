import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WeatherCurrent from './components/WeatherCurrent';
import WeatherForecast from './components/WeatherForecast';
import TempChart from './components/TempChart';
import NewsFeed from './components/NewsFeed';
import HistoryPanel from './components/HistoryPanel';
import { fetchWeather, fetchForecast, processForecast } from './lib/weather';
import { fetchNews } from './lib/news';
import { saveSearch, loadHistory } from './lib/db';

export default function App() {
    const [weather,  setWeather]  = useState(null);
    const [forecast, setForecast] = useState([]);
    const [news,     setNews]     = useState([]);
    const [history,  setHistory]  = useState([]);
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState('');

    useEffect(() => {
        fetchNews().then(setNews).catch(() => {});
        loadHistory().then(setHistory);
        const lastCity = JSON.parse(localStorage.getItem('favorites') || '[]')[0];
        if (lastCity) search(lastCity);
    }, []);

    async function search(city) {
        setLoading(true);
        setError('');
        try {
            const [w, f] = await Promise.all([fetchWeather(city), fetchForecast(city)]);
            setWeather(w);
            setForecast(processForecast(f));
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (!favs.includes(city)) {
                localStorage.setItem('favorites', JSON.stringify([city, ...favs].slice(0, 5)));
            }
            saveSearch(w);
            loadHistory().then(setHistory);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar onSearch={search} />
            <main className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <WeatherCurrent weather={weather} loading={loading} error={error} />
                    <WeatherForecast forecast={forecast} loading={loading} />
                    <TempChart forecast={forecast} />
                    <NewsFeed articles={news} />
                    <div className="md:col-span-2">
                        <HistoryPanel records={history} onSelect={search} />
                    </div>
                </div>
            </main>
            <footer className="text-center py-4 text-sm text-slate-400 border-t border-slate-200 bg-white">
                © 2026 Dashboard Clima &amp; Notícias — FATEC Itatiba
            </footer>
        </div>
    );
}
