const NEWS_API_KEY = 'SUA_CHAVE_AQUI';
const NEWS_BASE = 'https://gnews.io/api/v4';

async function fetchNews(country = 'br') {
    const url = `${NEWS_BASE}/top-headlines?country=${country}&lang=pt&max=6&apikey=${NEWS_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Notícias indisponíveis');
    const data = await res.json();
    return data.articles;
}

function renderNews(articles) {
    const container = document.getElementById('news-container');

    if (!articles.length) {
        container.innerHTML = '<p class="state-msg">Nenhuma notícia encontrada.</p>';
        return;
    }

    container.innerHTML = articles.map(a => `
        <div class="news-card">
            <img
                class="news-thumb"
                src="${a.image || ''}"
                alt=""
                onerror="this.style.display='none'"
            >
            <div class="news-body">
                <div class="news-title">${a.title || ''}</div>
                <div class="news-desc">${a.description || ''}</div>
                <a class="news-link" href="${a.url}" target="_blank" rel="noopener">Ler mais →</a>
            </div>
        </div>
    `).join('');
}
