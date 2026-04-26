addEventListener('load', function() {
    const rankingBody = document.getElementById('ranking-body');
    const ranking = JSON.parse(localStorage.getItem('ranking') || "[]");
    
    rankingBody.innerHTML = ""; 
    ranking.forEach((entry, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${entry.user}</td>
            <td>${entry.points}</td>
            <td>${entry.level || 1}</td>
        </tr>`;
        rankingBody.innerHTML += row;
    });

    function iniciarJuego(modo) {
        const nom = prompt("Quin es el teu nom?"); 
        if (!nom) return;
        
        sessionStorage.setItem('alias', nom);
        
        let config = JSON.parse(sessionStorage.getItem('config')) || {};
        config.mode = modo; 
        sessionStorage.setItem('config', JSON.stringify(config));
        
        sessionStorage.removeItem('load');
        window.location.assign("./html/game.html");
    }

    document.getElementById('play-m1').addEventListener('click', () => iniciarJuego(1));
    document.getElementById('play-m2').addEventListener('click', () => iniciarJuego(2));

    // 3. Lógica para Opciones
    document.getElementById('options').addEventListener('click', function(){
        window.location.assign("./html/options.html");
    });
	
    document.getElementById('saves').addEventListener('click', function(){
        window.location.assign("./html/load.html");
    });
¡
    document.getElementById('exit').addEventListener('click', function(){
        if (confirm("Vols sortir de la página?")) {
             window.location.href = "about:blank";
        }
    });
}); /