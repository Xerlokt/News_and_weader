import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TempChart({ forecast }) {
    const canvasRef = useRef(null);
    const chartRef  = useRef(null);

    useEffect(() => {
        if (!forecast.length) return;
        if (chartRef.current) chartRef.current.destroy();
        chartRef.current = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels: forecast.map(d => d.label),
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: forecast.map(d => d.temp),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.08)',
                    borderWidth: 2,
                    pointRadius: 5,
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
                    y: { ticks: { callback: v => `${v}°` }, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
        return () => chartRef.current?.destroy();
    }, [forecast]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">Temperatura da Semana</p>
            <div className="relative h-48">
                {forecast.length
                    ? <canvas ref={canvasRef} />
                    : <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                        Busque uma cidade para ver o gráfico.
                      </div>
                }
            </div>
        </div>
    );
}
