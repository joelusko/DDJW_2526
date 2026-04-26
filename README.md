# Memory Game - Treball individual - DDJW_2526

## 1. Introducción
Este trabajo consiste en tomar una base ya proporcionada e implementar un juego memory usando JavaScript y HTML.

## 2. Descripción del diseño del juego
El estilo artistico minimalista del juego está inspirado en el juego web Wordle.
El modo 1 es el modo clasico del juego memory. Dentro del menú de opciones se puede elejir el numero de cartas por grupo con las que se quiere jugar (parejas, trios, quartetos).
El modo 2 es un modo "infinito" en el que progresivamente se aumentan el numero de grupos y el numero de cartas por grupo. Este modo funciona a contrareloj, se inicia con un temporizador de 120 segundos, cada acierto suma 10 segundos y cada nivel suma 30. Si el temporizador llega a 0, es game over.
En ambos modos, cada acierto suma 50 puntos y cada fallo resta 25 puntos

## 3. Descripción de las partes más relevantes de la implementación
Estos son los apartados más remarcables del codigo:
* **Renderizado gráfico con HTML5 Canvas:**
  Toda la interacción gráfica de la partida se gestiona en `game.js` mediante un elemento `<canvas>`. He implementado una función `drawSVGCard()` que carga las imágenes SVG programadas. El bucle de renderizado se actualiza constantemente con `requestAnimationFrame()`, dibujando las cartas en una cuadrícula calculada dinámicamente según el índice de cada carta.

  * **Lógica de Tamaño de Grupos Dinámica:**
  Para soportar parejas, tríos y cuartetos, he creado la variable `groupSize`. Cuando el jugador hace clic en una carta, esta se añade a un array temporal llamado `lastCards`. La comprobación de acierto solo se dispara cuando la longitud de `lastCards` iguala a `groupSize`. Para verificar si todas las cartas del grupo son idénticas, se utiliza de manera eficiente el método `.every()` de JavaScript: 
  `let allMatch = this.lastCards.every(i => this.items[i] === this.items[this.lastCards[0]]);`

## 4. Conclusiones y problemas encontrados
He aprendido a trabajar con dibujo vectorial y la gestión de varias partidas
Pero también he tenido muchos problemas, el codigo se me rompia cada vez que creí arreglar un error. Sobretodo, he tenido muchos problemas al momento de mostrar las cartas. También tuve errores cuando implementé la opción de cargar partida
