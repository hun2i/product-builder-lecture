
class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        const group = Math.floor((parseInt(number, 10) - 1) / 10) * 10 + 1;

        const ball = document.createElement('div');
        ball.textContent = number;
        
        const style = document.createElement('style');
        // Simplified CSS variables for shadow DOM to avoid potential issues with --white default
        style.textContent = `
            :host {
                display: inline-block;
                width: 60px;
                height: 60px;
                line-height: 60px;
                border-radius: 50%;
                background-color: var(--ball-color, #eee);
                color: white; /* Explicitly white for numbers inside balls */
                font-size: 1.5rem;
                font-weight: bold;
                text-align: center;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }
            div {
                color: white; /* Ensure text color is white */
            }
        `;

        this.dataset.numberGroup = group;
        shadow.appendChild(style);
        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    if (themeToggleButton) { // Check if button exists before adding event listener
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }


    // Lotto Generation Logic
    const generateButton = document.getElementById('generate-btn');
    if (generateButton) { // Check if button exists before adding event listener
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

