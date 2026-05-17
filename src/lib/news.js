const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE    = import.meta.env.VITE_NEWS_BASE;

export async function fetchNews(country = 'br') {
    const res = await fetch(`${NEWS_BASE}/top-headlines?country=${country}&lang=pt&max=6&apikey=${NEWS_API_KEY}`);
    if (!res.ok) throw new Error('Notícias indisponíveis');
    const data = await res.json();
    return data.articles;
}
