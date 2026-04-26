import { game, startGame, clickCard } from "./memory.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cardWidth = 80;
const cardHeight = 110;
const margin = 15;
const cardsPerRow = 4;

const imageCache = {};

function drawSVGCard(x, y, path) {
    if (!imageCache[path]) {
        const img = new Image();
        img.onload = () => { /* Forzar render cuando cargue la imagen */ };
        img.src = path;
        imageCache[path] = img;
    }

    const img = imageCache[path];
    if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, x, y, cardWidth, cardHeight);
    } else {
        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, cardWidth, cardHeight);
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (game.items && game.items.length > 0) {
        game.items.forEach((item, i) => {
            const row = Math.floor(i / cardsPerRow);
            const col = i % cardsPerRow;
            const x = margin + col * (cardWidth + margin);
            const y = margin + row * (cardHeight + margin);

            if (game.states[i] === 1) { 
                drawSVGCard(x, y, '../resources/back.svg');
            } else {
                drawSVGCard(x, y, item); 
            }
        });
    }

    requestAnimationFrame(render);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    game.items.forEach((_, i) => {
        const row = Math.floor(i / cardsPerRow);
        const col = i % cardsPerRow;
        const x = margin + col * (cardWidth + margin);
        const y = margin + row * (cardHeight + margin);

        if (mouseX >= x && mouseX <= x + cardWidth &&
            mouseY >= y && mouseY <= y + cardHeight) {
            clickCard(i);
        }
    });
});
game.select();
startGame();
render();