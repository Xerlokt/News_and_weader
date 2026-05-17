import Skeleton from './Skeleton';

export default function WeatherCurrent({ weather, loading, error }) {
    if (loading) return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <Skeleton className="h-4 w-24 mb-4" />
            <div className="flex gap-4 items-center mb-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-7 w-28 rounded-full" />
                <Skeleton className="h-7 w-28 rounded-full" />
                <Skeleton className="h-7 w-28 rounded-full" />
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">Clima Atual</p>
            <p className="text-red-500 text-sm">⚠️ {error}</p>
        </div>
    );

    if (!weather) return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center text-slate-400 min-h-[180px]">
            <span className="text-4xl mb-2">🌤</span>
            <p className="text-sm">Digite uma cidade para buscar.</p>
        </div>
    );

    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const id = weather.weather[0].id;
    const gradient =
        id === 800 ? 'from-blue-400 to-blue-600'
        : id > 800  ? 'from-slate-400 to-blue-500'
        : id >= 700 ? 'from-slate-400 to-slate-600'
        : id >= 600 ? 'from-blue-200 to-blue-400'
        : id >= 500 ? 'from-slate-500 to-slate-700'
        : id >= 300 ? 'from-slate-400 to-blue-500'
        : 'from-gray-600 to-gray-800';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className={`bg-gradient-to-br ${gradient} p-5 text-white`}>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-3">Clima Atual</p>
                <div className="flex items-center gap-3">
                    <img src={iconUrl} alt={weather.weather[0].description} width="64" height="64" />
                    <div>
                        <div className="text-5xl font-black leading-none">{Math.round(weather.main.temp)}°C</div>
                        <div className="capitalize text-sm opacity-90 mt-1">{weather.weather[0].description}</div>
                        <div className="text-xs opacity-75 mt-0.5">{weather.name}, {weather.sys.country}</div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex gap-2 flex-wrap">
                {[
                    ['💧', `Humidade: ${weather.main.humidity}%`],
                    ['💨', `Vento: ${Math.round(weather.wind.speed * 3.6)} km/h`],
                    ['🌡', `Sensação: ${Math.round(weather.main.feels_like)}°C`],
                ].map(([icon, label]) => (
                    <span key={label} className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full">{icon} {label}</span>
                ))}
            </div>
        </div>
    );
}
