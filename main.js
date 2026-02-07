class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        
        const group = Math.floor((parseInt(number, 10) - 1) / 10) * 10 + 1;
        this.setAttribute('data-number-group', group); // Re-added this crucial line

        const ball = document.createElement('div');
        ball.textContent = number;
        
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: inline-block;
                width: 60px;
                height: 60px;
                line-height: 60px;
                border-radius: 50%;
                background-color: var(--ball-color, #eee); /* Rely on external CSS for color */
                color: white;
                font-size: 1.5rem;
                font-weight: bold;
                text-align: center;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease; /* Re-added transition to host */
                margin: 5px; /* Added margin here for consistent spacing */
            }
            div {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            :host(:hover) {
                transform: scale(1.1); /* Hover effect on host */
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
