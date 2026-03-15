import { jQuery as $ } from '../library/jquery-4.0.0.slim.module.min.js';

$(function() {
    $('#play').on('click', function(){
        var nom = prompt("Quin es el teu nom?");
        console.log(nom);
        
        window.location.assign("./html/game.html");
    });

    $('#options').on('click', function(){
        console.error("Opció no implementada");
    });

    $('#saves').on('click', function(){
        console.error("Opció no implementada");
    });

    $('#exit').on('click', function(){
        console.warn("No es pot sortir!");
    });
});