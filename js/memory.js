const resources = ['../resources/cb.png', '../resources/co.png',
                '../resources/sb.png', '../resources/so.png',
                '../resources/tb.png', '../resources/to.png'];
const back = '../resources/back.png';

const StateCard = Object.freeze({
  DISABLE: 0,
  ENABLE: 1,
  DONE: 2
});

var game = {
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
    select: function(){
        if (sessionStorage.load){ // Carreguem partida
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCard = toLoad.lastCard;
            this.score = toLoad.score;
            this.pairs = toLoad.pairs;
            sessionStorage.removeItem('load'); // Netegem per no recarregar sempre el mateix
        }
        else{ // Nova partida
            this.items = resources.slice();          
            shuffe(this.items);

			let numGroups = 2; //Se inicializa en 2 para las parejas
            this.items = this.items.slice(0, numGroups);
			
			let totalCards = []; //Creo un array temporal para almacenar todas las cartas que contendrá la partida
			for(let i = 0; i < this.groupSize; i++){ //Concadena el vector totalCards, que inicialmente está vacio, con el vector items tantas veces como grande sea el grupo
				totalCards = totalCards.concat(this.items);
			}
			
            this.items = totalCards;
            shuffe(this.items);
            
            this.groupsOfCards = numGroups; // Actualizamos cuántos grupos hay que encontrar
            this.states = new Array(this.items.length).fill(StateCard.ENABLE);
        }
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
    },
    click: function(indx){
        if (this.states[indx] !== StateCard.ENABLE || this.ready < this.items.length) return;
        this.goFront(indx);
		this.lastCards.push(indx); // Añade la carta clickada al vector de cartas clickadas
		
        if (this.lastCards.length < this.groupSize) return; //Si el jugador no ha clickado tantas cartas como indica el tamaño del grupo, no hace nada
        
		let allMatch = this.lastCards.every(i => this.items[i] === this.items[this.lastCards[0]]); //Mediante la funcion .every, que devuelte un booleano, comprobamos si todas las cartas que ha clickado el jugador son iguales
    
		if(allMatch){
			this.groupsOfCards-- //Hay un grupo menos que encontrar
			this.lastCards.forEach(i => this.states[i] = StateCard.DONE); //Marca todas las cartas clickadas por el jugador como resueltas
	
			if (this.groupsOfCards <= 0) {
                alert(`Has ganado con ${this.score} puntos!`);
                window.location.assign("../");
			}
		} else {
			this.ready = 0;
			let cardsToFlipBack = [...this.lastCards]; //Crea una copia de las cartas clickadas
			
			setTimeout(() => {
                cardsToFlipBack.forEach(i => this.goBack(i)); // Da la vuelta a todas todas las cartas clickadas
                this.ready = this.items.length; 
            }, 1000);
			
			this.score -= 25; // Penalización
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
            lastCard: this.lastCard,
            score: this.score,
            pairs: this.pairs
        });
        
        // Segons punt 4.c.iii: "S'ha de guardar en local, no cal fer PHP"
        localStorage.setItem('save', to_save);
        console.warn("La partida s'ha guardat en local.");
        window.location.assign("../");
    }
}

function shuffe(arr){
    arr.sort(function () {return Math.random() - 0.5});
}

// Exports per a la interfície de Canvas
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