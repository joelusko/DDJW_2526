const resources = ['../resources/circulo.svg', '../resources/cuadrado.svg',
                '../resources/estrella.svg', '../resources/exagono.svg',
                '../resources/pentagono.svg', '../resources/triangulo.svg'];
const back = '../resources/back.svg';

const StateCard = Object.freeze({
  DISABLE: 0,
  ENABLE: 1,
  DONE: 2
});

export var game = {
    
	timer: 120,
	timerInterval: null,
	timerDisplay: null,
	
	level: 1,
	maxGroups: 2, 
	mode: 1,
	
	items: [],
    states: [],
    setValue: null,
    ready: 0,
    lastCards: [], //Lo transformo en una array para poder recordar las cartas que el jugador ha ido clickando, de esta forma, si el jugador falla se le vuelven a dar la vuelta a todas las del array. cuando la lonjitud del array sea igual a groupSize comprobará si todas son iguales
    score: 200,
    groupsOfCards: 2, //Redefino la variable "pairs" para adaptarla a que ahora pueden haber grupos de distintos tamaños
	groupSize: 2, //Lo creo para poder tener diferentes medidas de grupo, de base es 2 para las parejas
    
	goBack: function(idx){
        this.setValue && this.setValue[idx](back);
        this.states[idx] = StateCard.ENABLE;
    },
    goFront: function(idx){
        this.setValue && this.setValue[idx](this.items[idx]);
        this.states[idx] = StateCard.DISABLE;
    },
	
	saveScore: function(){
		if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null; // Limpiamos la referencia
		}
		
		let name = prompt(`¡Partida terminada! Puntos: ${this.score} Introduce tu nombre para el ranking:`);
		if (!name) name = "Anónimo";
		
		let ranking = JSON.parse(localStorage.getItem('ranking') || "[]");
		ranking.push({user: name, points: this.score, level: this.level});
		
		ranking.sort((a, b) => b.points - a.points);
		ranking = ranking.slice(0, 10);
		
		localStorage.setItem('ranking', JSON.stringify(ranking));
	},
	
	setupUI: function(){
		const gameDiv = document.getElementById('ui-info');
		
		this.timeDisplay = document.createElement('div');
		this.timeDisplay.style.fontSize = "20px";
		this.timeDisplay.style.fontWeight = "bold";
		this.timeDisplay.style.marginBottom = "10px";
		this.timeDisplay.style.color = "red";
		this.timeDisplay.innerText = `Tiempo: ${this.timer}s | Puntos: ${this.score}`;
		
		gameDiv.insertBefore(this.timeDisplay, gameDiv.firstChild);
	},
	
	updateUI: function(){
		if (this.timeDisplay) {
            this.timeDisplay.innerText = `Tiempo: ${this.timer}s | Puntos: ${this.score}`;
        }
	},
	
	startTimer: function() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.updateUI(); // Actualizamos el texto en cada segundo

            if (this.timer <= 0) {
                clearInterval(this.timerInterval);
                alert("¡Tiempo agotado!");
                this.saveScore();
                window.location.assign("../");
            }
        }, 1000);
    },
	
    select: function(){
        this.setupUI();
		if (sessionStorage.load){ // Carreguem partida
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCards = toLoad.lastCards;
            this.score = toLoad.score;
            this.groupsOfCards = toLoad.groupsOfCards;
            sessionStorage.removeItem('load'); // Netegem per no recarregar sempre el mateix
        }
        else{ // Nova partida
            let config = JSON.parse(sessionStorage.getItem('config'));

			if(config){
				this.mode = config.mode || this.mode;
				this.groupSize = config.groupSize || this.groupSize; 
				this.maxGroups = config.maxGroups || this.maxGroups;
}
			
			this.items = resources.slice();          
            shuffle(this.items);

			let numGroups = this.maxGroups;
            this.items = this.items.slice(0, numGroups);
			
			let totalCards = []; //Creo un array temporal para almacenar todas las cartas que contendrá la partida
			for(let i = 0; i < this.groupSize; i++){ //Concadena el vector totalCards, que inicialmente está vacio, con el vector items tantas veces como grande sea el grupo
				totalCards = totalCards.concat(this.items);
			}
			
            this.items = totalCards;
            shuffle(this.items);
            
            this.groupsOfCards = numGroups; // Actualizamos cuántos grupos hay que encontrar
            this.states = new Array(this.items.length).fill(StateCard.ENABLE);
        }
    },
	
	nextLevel: function(){
		this.level++;
		this.timer += 30;
		this.ready = 0;
		this.updateUI();
		
		if (this.maxGroups < 6) {
            this.maxGroups++;
		}
		else if (this.level > 3 && this.groupSize < 3) {
            this.groupSize = 3;
            this.maxGroups = 3; // Bajamos grupos al cambiar a tríos para no saturar
        }
		else if (this.level > 6 && this.groupSize < 4) {
            this.groupSize = 4;
            this.maxGroups = 3; // Cuartetos es MUY difícil
        }
		
		alert(`¡Nivel ${this.level}!`);
		
		if (this.timerInterval) clearInterval(this.timerInterval);
		this.select();
		this.start();
	},
    start: function(){
        this.items.forEach((_,indx)=>{
            if (this.states[indx] === StateCard.DISABLE ||
                this.states[indx] === StateCard.DONE){
                this.ready++;
            }
            else{
                setTimeout(()=>{
                    this.ready++;
                    this.goBack(indx);
                }, 1000 + 100 * indx);
            }
        });
		this.startTimer();
    },
    click: function(indx){
        if (this.states[indx] !== StateCard.ENABLE || this.ready < this.items.length) return;
        this.goFront(indx);
		this.lastCards.push(indx); // Añade la carta clickada al vector de cartas clickadas
		
        if (this.lastCards.length < this.groupSize) return; //Si el jugador no ha clickado tantas cartas como indica el tamaño del grupo, no hace nada
        
		let allMatch = this.lastCards.every(i => this.items[i] === this.items[this.lastCards[0]]); //Mediante la funcion .every, que devuelte un booleano, comprobamos si todas las cartas que ha clickado el jugador son iguales
    
		if(allMatch){
			this.groupsOfCards-- //Hay un grupo menos que encontrar
			this.score += 50;
			this.timer += 10;
			this.updateUI();
			this.lastCards.forEach(i => this.states[i] = StateCard.DONE); //Marca todas las cartas clickadas por el jugador como resueltas
	
			if (this.groupsOfCards <= 0) {
				if(this.mode === 1){ //MODO 1, acaba la partida
					alert(`Has ganado con ${this.score} puntos!`);
					this.saveScore();
					window.location.assign("../");
				} else { //MODO 2, salta al siguiente nivel
					setTimeout(() => {
						this.nextLevel();
					}, 500);
				}
			}
			
		} else {
			this.score -= 25;
			this.updateUI();
			this.ready = 0;
			let cardsToFlipBack = [...this.lastCards]; //Crea una copia de las cartas clickadas
			
			setTimeout(() => {
                cardsToFlipBack.forEach(i => this.goBack(i)); // Da la vuelta a todas todas las cartas clickadas
                this.ready = this.items.length; 
            }, 1000);
            if (this.score <= 0) {
                alert("Game Over:(");
                window.location.assign("../");
			}
		}
		
		this.lastCards = [];
	},
    save: function(){
        let to_save = JSON.stringify({
            items: this.items,
            states: this.states,
            lastCards: this.lastCards,
            score: this.score,
            groupsOfCards: this.groupsOfCards,
			level: this.level,
			groupSize: this.groupSize,
        });
        
        localStorage.setItem('save', to_save);
        console.warn("La partida s'ha guardat en local.");
        window.location.assign("../");
    }
}

function shuffle(arr){
    arr.sort(function () {return Math.random() - 0.5});
}

export var gameItems;
export function selectCards() { 
    game.select();
    gameItems = game.items;
}
export function clickCard(indx){ game.click(indx); }
export function startGame(){ game.start(); }
export function initCard(callback) { 
    if (!game.setValue) game.setValue = [];
    game.setValue.push(callback); 
}
export function saveGame(){ game.save(); }