document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // Theme Toggle
    // ===========================
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    function updateThemeIcon() {
        if (!themeToggleButton) return;
        themeToggleButton.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }
    updateThemeIcon();

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
            } else {
                localStorage.removeItem('theme');
            }
            updateThemeIcon();
        });
    }

    // ===========================
    // Menu Recommendation
    // ===========================
    const menuItems = [
        { name: "김치찌개", emoji: "🍲", category: "한식" },
        { name: "된장찌개", emoji: "🫕", category: "한식" },
        { name: "비빔밥", emoji: "🍚", category: "한식" },
        { name: "불고기", emoji: "🥩", category: "한식" },
        { name: "삼겹살", emoji: "🥓", category: "한식" },
        { name: "떡볶이", emoji: "🌶️", category: "한식" },
        { name: "칼국수", emoji: "🍜", category: "한식" },
        { name: "짜장면", emoji: "🍝", category: "중식" },
        { name: "짬뽕", emoji: "🥘", category: "중식" },
        { name: "탕수육", emoji: "🍖", category: "중식" },
        { name: "초밥", emoji: "🍣", category: "일식" },
        { name: "라멘", emoji: "🍜", category: "일식" },
        { name: "돈까스", emoji: "🍛", category: "일식" },
        { name: "파스타", emoji: "🍝", category: "양식" },
        { name: "피자", emoji: "🍕", category: "양식" },
        { name: "햄버거", emoji: "🍔", category: "양식" },
        { name: "스테이크", emoji: "🥩", category: "양식" },
        { name: "치킨", emoji: "🍗", category: "치킨" },
        { name: "족발", emoji: "🦶", category: "야식" },
        { name: "보쌈", emoji: "🥬", category: "한식" },
    ];

    const recommendMenuButton = document.getElementById('recommend-menu-btn');
    const menuRecommendationContainer = document.getElementById('menu-recommendation-container');

    if (recommendMenuButton && menuRecommendationContainer) {
        recommendMenuButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * menuItems.length);
            const menu = menuItems[randomIndex];
            menuRecommendationContainer.innerHTML = `
                <div class="menu-result-card">
                    <span class="menu-result-emoji">${menu.emoji}</span>
                    <span class="menu-result-name">${menu.name}</span>
                    <span class="menu-result-category">${menu.category}</span>
                </div>
            `;
        });
    }
});
