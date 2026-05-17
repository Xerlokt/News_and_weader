import { useState } from 'react';

export default function Navbar({ onSearch }) {
    const [city, setCity] = useState('');
    const [open, setOpen] = useState(false);

    function handleSearch() {
        if (city.trim()) onSearch(city.trim());
    }

    return (
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                    <span className="text-2xl">☀️</span>
                    <span className="font-bold text-slate-800 text-lg hidden sm:block">Dashboard Clima &amp; Notícias</span>
                </div>

                <div className={`gap-2 items-center ${open ? 'flex' : 'hidden md:flex'} absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 border-b md:border-0 border-slate-200 z-40`}>
                    <input
                        className="flex-1 md:w-52 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-500 transition"
                        placeholder="🔍 Buscar cidade..."
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition cursor-pointer"
                    >
                        Buscar
                    </button>
                </div>

                <button
                    className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-0"
                    onClick={() => setOpen(o => !o)}
                    aria-label="Menu"
                >
                    <span className="block w-5 h-0.5 bg-slate-700 rounded" />
                    <span className="block w-5 h-0.5 bg-slate-700 rounded" />
                    <span className="block w-5 h-0.5 bg-slate-700 rounded" />
                </button>
            </div>
        </header>
    );
}
