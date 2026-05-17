import Skeleton from './Skeleton';

export default function WeatherForecast({ forecast, loading }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Previsão 5 Dias</p>
            <div className="flex gap-2">
                {loading
                    ? Array(5).fill(0).map((_, i) => <Skeleton key={i} className="flex-1 h-24 rounded-xl" />)
                    : forecast.length
                        ? forecast.map((d, i) => (
                            <div key={i} className="flex-1 bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                                <div className="text-xs font-bold text-slate-400 uppercase">{d.label}</div>
                                <img
                                    src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
                                    alt=""
                                    width="40"
                                    height="40"
                                    className="mx-auto"
                                />
                                <div className="font-bold text-slate-700 text-sm">{d.temp}°</div>
                            </div>
                        ))
                        : <p className="text-slate-400 text-sm w-full text-center py-6">Busque uma cidade para ver a previsão.</p>
                }
            </div>
        </div>
    );
}
