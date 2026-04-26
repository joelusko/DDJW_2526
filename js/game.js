import { game, selectCards, clickCard, startGame } from "./memory.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuramos dimensiones
const cardWidth = 80;
const cardHeight = 110;
const margin = 15;
const cardsPerRow = 4;

// Función de dibujo programado (Punto 3.b del PDF)
function drawSymbol(x, y, type) {
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    // Filtramos por el nombre del recurso (cb, co, sb, etc.)
    if (type.includes('cb')) { // Círculo Azul
        ctx.strokeStyle = 'blue';
        ctx.arc(x + cardWidth / 2, y + cardHeight / 2, 20, 0, Math.PI * 2);
    } 
    else if (type.includes('co')) { // Círculo Oro
        ctx.strokeStyle = 'gold';
        ctx.arc(x + cardWidth / 2, y + cardHeight / 2, 20, 0, Math.PI * 2);
    } 
    else if (type.includes('sb')) { // Cuadrado Azul
        ctx.strokeStyle = 'blue';
        ctx.rect(x + 20, y + 35, 40, 40);
    } 
    else if (type.includes('tb')) { // Triángulo Azul
        ctx.strokeStyle = 'blue';
        ctx.moveTo(x + cardWidth / 2, y + 30);
        ctx.lineTo(x + 20, y + 80);
        ctx.lineTo(x + 60, y + 80);
        ctx.closePath();
    }
    // NOTA: Debes programar aquí el resto (so, to, etc.) para tener el 1p de la parte artística
    
    ctx.stroke();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.items.forEach((item, i) => {
        const row = Math.floor(i / cardsPerRow);
        const col = i % cardsPerRow;
        const x = margin + col * (cardWidth + margin);
        const y = margin + row * (cardHeight + margin);

        // Fondo de la carta
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(x, y, cardWidth, cardHeight);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(x, y, cardWidth, cardHeight);

        // Lógica de estados (Punto 4.b)
        // 1 es ENABLE (oculta), 0 es DISABLE (mostrada), 2 es DONE (resuelta)
        if (game.states[i] === 1) { 
            ctx.fillStyle = 'darkblue'; // Reverso
            ctx.fillRect(x + 5, y + 5, cardWidth - 10, cardHeight - 10);
        } else {
            drawSymbol(x, y, item); // Frontal (programado)
        }
    });

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

// Inicialización corregida
selectCards();
render();
startGame();