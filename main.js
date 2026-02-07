document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }

    // Menu Recommendation Logic
    const menuItems = [
        "김치찌개 (Kimchi Stew)",
        "된장찌개 (Soybean Paste Stew)",
        "비빔밥 (Mixed Rice)",
        "불고기 (Bulgogi)",
        "삼겹살 (Pork Belly)",
        "짜장면 (Black Bean Noodles)",
        "짬뽕 (Spicy Seafood Noodles)",
        "탕수육 (Sweet and Sour Pork)",
        "초밥 (Sushi)",
        "돈까스 (Pork Cutlet)",
        "파스타 (Pasta)",
        "피자 (Pizza)",
        "치킨 (Chicken)",
        "족발 (Pig's Trotters)",
        "보쌈 (Boiled Pork Wrap)"
    ];

    const recommendMenuButton = document.getElementById('recommend-menu-btn');
    const menuRecommendationContainer = document.getElementById('menu-recommendation-container');

    if (recommendMenuButton && menuRecommendationContainer) {
        recommendMenuButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * menuItems.length);
            const recommendedMenu = menuItems[randomIndex];
            menuRecommendationContainer.innerHTML = `<p class="recommended-menu-text">${recommendedMenu}</p>`;
        });
    }
});
