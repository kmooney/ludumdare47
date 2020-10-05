import * as THREE from "three";
import * as CANNON from "cannon";
import './style.css';
import Game from "./Game.js"
import CheatCodes from "./CheatCodes.js"

var game = null;

function start(){
    game = new Game()
    const cheats = new CheatCodes(game)
    game.init()
    document.body.appendChild( game.renderer.domElement )
    game.startGame()
}

function onWindowResize(e){
    if(game != null){
        game.handleResize()
    }
}

function main(){
    // Start Game Button
    document.getElementById("startGame").addEventListener("click", e =>{
        document.getElementById("title").style.display = "none"
        document.getElementById("overlay").style.display = "block"
        start()
    })

    // End GameEvent
    window.addEventListener( 'gameOver', e => {
        document.getElementById("gameOver").style.display = "block"
        document.getElementById("newGame").addEventListener("click", e=> {
            game.destroy() 
            start()
        })

    })

    // track resize events
    window.addEventListener( 'resize', onWindowResize, false );

    // Prevent default touch drag behaviour
    function preventBehavior(e) {
        e.preventDefault(); 
    };
    document.addEventListener("touchmove", preventBehavior, {passive: false});

    if(typeof(gtag) != 'undefined'){
        console.log("connecting google analytics event handlers with ",ga_measurement_id)
        window.addEventListener( 'gameOver', e => {
            gtag('event', 'page_view', {
                page_title: 'Game Over',
                page_location: '/game-over/',
                send_to: ga_measurement_id
             });
        })
        window.addEventListener( 'loopEscaped', e => {
            gtag('event', 'page_view', {
                page_title: 'Loop Escaped',
                page_location: '/loop-escaped/',
                send_to: ga_measurement_id
             });
        })
    }
}
main();
