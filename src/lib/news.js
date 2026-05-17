const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE    = 'https://newsdata.io/api/1';

export async function fetchNews(country = 'br') {
    const res = await fetch(`${NEWS_BASE}/latest?apikey=${NEWS_API_KEY}&country=${country}&language=pt&size=6`);
    if (!res.ok) throw new Error('Notícias indisponíveis');
    const data = await res.json();
    return data.results.map(a => ({
        title:       a.title,
        description: a.description,
        url:         a.link,
        image:       a.image_url,
    }));
}
