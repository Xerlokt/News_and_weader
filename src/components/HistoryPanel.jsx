export default function HistoryPanel({ records, onSelect }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Histórico de Buscas</p>
            {!records.length
                ? <p className="text-slate-400 text-sm text-center py-4">Nenhuma busca registrada ainda.</p>
                : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {records.map(r => {
                            const ts = r.timestamp
                                ? new Date(r.timestamp).toLocaleString('pt-BR')
                                : '—';
                            return (
                                <button
                                    key={r.id}
                                    onClick={() => onSelect(r.city)}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-blue-200 transition text-left cursor-pointer w-full"
                                >
                                    <img
                                        src={`https://openweathermap.org/img/wn/${r.icon}.png`}
                                        alt=""
                                        width="32"
                                        height="32"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-slate-700 truncate">{r.city}, {r.country}</div>
                                        <div className="text-xs text-slate-400 capitalize">{r.temp}°C · {r.description}</div>
                                    </div>
                                    <div className="text-xs text-slate-300 whitespace-nowrap hidden sm:block">{ts}</div>
                                </button>
                            );
                        })}
                    </div>
                )
            }
        </div>
    );
}
