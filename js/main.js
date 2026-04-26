addEventListener('load', function() {
    //Mostrar el Ranking al cargar la página 
    const rankingBody = document.getElementById('ranking-body');
    const ranking = JSON.parse(localStorage.getItem('ranking') || "[]");
    
    ranking.forEach((entry, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${entry.user}</td>
            <td>${entry.points}</td>
            <td>${entry.level || 1}</td>
        </tr>`;
        rankingBody.innerHTML += row;
    });

    //Lógica para elegir modo de juego 
    function iniciarJuego(modo) {
        const nom = prompt("Quin es el teu nom?"); // 
        if (!nom) return;
        
        sessionStorage.setItem('alias', nom);
        
        // Guardamos la configuración del modo elegido
        let config = JSON.parse(sessionStorage.getItem('config')) || {};
        config.mode = modo; 
        sessionStorage.setItem('config', JSON.stringify(config));
        
        sessionStorage.removeItem('load');
        window.location.assign("./html/game.html");
    }

    document.getElementById('play-m1').addEventListener('click', () => iniciarJuego(1));
    document.getElementById('play-m2').addEventListener('click', () => iniciarJuego(2));

    // Lógica para Opciones
    document.getElementById('options').addEventListener('click', function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', function(){
        let to_load = localStorage.getItem('save');

        if (!to_load) {
            alert("No hi ha cap partida a carregar");
            return;
        }
        sessionStorage.load = to_load;
        window.location.assign("./html/game.html");
    });

    // Lógica para Salir (opcional)
    document.getElementById('exit').addEventListener('click', function(){
        if (confirm("Vols sortir de la página?")) {
             window.location.href = "about:blank";
        }
    });
});