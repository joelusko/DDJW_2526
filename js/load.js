document.addEventListener('DOMContentLoaded', () => {
    const loadBody = document.getElementById('load-body');
    const backBtn = document.getElementById('back-menu');

    const savedGames = JSON.parse(localStorage.getItem('savedGames') || "[]");

    if (savedGames.length === 0) {
        loadBody.innerHTML = '<tr><td colspan="4">No hi ha partides guardades</td></tr>';
    } else {
        savedGames.forEach((game, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${game.date}</td>
                <td>${game.level || 1}</td>
                <td>${game.score}</td>
                <td><button class="btn-load" data-index="${index}">Carregar</button></td>
            `;
            loadBody.appendChild(row);
        });
    }

    loadBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-load')) {
            const index = e.target.getAttribute('data-index');
            const gameToLoad = savedGames[index];

           sessionStorage.setItem('load', JSON.stringify(gameToLoad));
            
            window.location.assign("./game.html");
        }
    });

    backBtn.addEventListener('click', () => {
        window.location.assign("../index.html");
    });
});