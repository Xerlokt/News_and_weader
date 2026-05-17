import Skeleton from './Skeleton';

export default function NewsFeed({ articles }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Últimas Notícias</p>
            <div className="space-y-3">
                {!articles.length
                    ? Array(4).fill(0).map((_, i) => (
                        <div key={i} className="flex gap-3">
                            <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-4/5" />
                            </div>
                        </div>
                    ))
                    : articles.map((a, i) => (
                        <div key={i} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                            {a.image && (
                                <img
                                    src={a.image}
                                    alt=""
                                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-slate-100"
                                    onError={e => { e.target.style.display = 'none'; }}
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">{a.title}</p>
                                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{a.description}</p>
                                <a
                                    href={a.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 font-semibold mt-1 inline-block hover:underline"
                                >
                                    Ler mais →
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
