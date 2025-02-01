// 新闻数据加载（可替换为真实API）
document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/news.json')
        .then(response => response.json())
        .then(newsData => renderNews(newsData))
        .catch(error => console.error('新闻加载失败:', error));
});

// 渲染新闻列表
function renderNews(newsArray) {
    const container = document.getElementById('newsList');
    container.innerHTML = newsArray.map(news => `
        <article class="news-item">
            <img src="${news.image}" alt="${news.title}" class="news-image">
            <div class="news-content">
                <h2 class="news-title">${news.title}</h2>
                <p class="news-date">${news.date}</p>
                <p class="news-summary">${news.summary}</p>
            </div>
        </article>
    `).join('');
}

// 搜索功能
function searchNews() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    fetch('./data/news.json')
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(item => 
                item.title.toLowerCase().includes(keyword) || 
                item.summary.toLowerCase().includes(keyword)
            );
            renderNews(filtered);
        });
}