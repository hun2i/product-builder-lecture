class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        
        const group = Math.floor((parseInt(number, 10) - 1) / 10) * 10 + 1;
        
        // 색상 매핑
        const colorMap = {
            1: '#fbc400',   // 1-10: 노랑
            10: '#69c8f2',  // 11-20: 파랑
            20: '#ff7272',  // 21-30: 빨강
            30: '#aaa',     // 31-40: 회색
            40: '#b0d840'   // 41-45: 초록
        };
        
        const ballColor = colorMap[group] || '#eee';

        const ball = document.createElement('div');
        ball.textContent = number;
        
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: inline-block;
                width: 60px;
                height: 60px;
                margin: 5px;
            }
            div {
                width: 100%;
                height: 100%;
                line-height: 60px;
                border-radius: 50%;
                background-color: ${ballColor};
                color: white;
                font-size: 1.5rem;
                font-weight: bold;
                text-align: center;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }
            div:hover {
                transform: scale(1.1);
            }
        `;
        
        shadow.appendChild(style);
        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

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

    const generateButton = document.getElementById('generate-btn');
    if (generateButton) {
        generateButton.addEventListener('click', () => {
            const resultContainer = document.getElementById('result-container');
            resultContainer.innerHTML = '';
            const numbers = new Set();

            while (numbers.size < 6) {
                numbers.add(Math.floor(Math.random() * 45) + 1);
            }

            const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

            sortedNumbers.forEach(number => {
                const lottoBall = document.createElement('lotto-ball');
                lottoBall.setAttribute('number', number);
                resultContainer.appendChild(lottoBall);
            });
        });
    }
});
