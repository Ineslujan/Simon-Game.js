'use strict';
/**
 * 
 * Code fourni
 */
const app = {
    // just a utility var to remember all the colors
    colors: ['red', 'green', 'blue', 'yellow'],

    // this var will contain the sequence said by Simon
    sequence: [],

    indice: 0,

    isPlayerTurn : false,

    drawCells: function () {
        const playground = document.getElementById('playground');
        for (const color of app.colors) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = color;
            cell.style.backgroundColor = color;
            playground.appendChild(cell);
        }
        // this listener here (and no in drawCells) for don't call it every time and duplicate it
        playground.addEventListener('click', (event) => {
            if (!app.isPlayerTurn){
                return;
            }
            // we check if the celle is the good cell
            console.log(event.target);
            clearTimeout(app.time);
            app.checkCell(event);
        });

    },

    bumpCell: function (color) {
        // let's modify the syle directly
        document.getElementById(color).style.borderWidth = '45px';
        // and reset the same style, after a small pause (150 ms)
        setTimeout(() => {
            document.getElementById(color).style.borderWidth = '0';
        }, 150);

    },

    newGame: function () {
        // start by reseting the sequence 
        app.sequence = [];
        // make it 3 times :
        for (let index = 0; index < 3; index++) {
            // get a random number between 0 and 3
            let random = Math.floor(Math.random() * 4);
            // add the corresponding color to the sequence
            app.sequence.push(app.colors[random]);
        }

        // start the "Simon Says" sequence
        app.simonSays(app.sequence);
    },

    simonSays: function (sequence) {
        // the "if" means he check if "sequence" is an array and if "sequence.length" has a length != 0
        if (sequence && sequence.length) {
            app.isPlayerTurn = false;
            app.showMessage('Mémorisez la séquence');
            // after 500ms, bump the first cell
            setTimeout(app.bumpCell, 500, sequence[0]);
            // plays the rest of the sequence after a longer pause
            setTimeout(app.simonSays, 850, sequence.slice(1));
        }
        else {
            app.showMessage('Reproduisez la séquence');
            app.isPlayerTurn=true;
            app.timeOut();
        }
    },

    init: function () {
        console.log('init');
        app.drawCells();

        // listen click on the "go" button
        document.getElementById('go').addEventListener('click', app.newGame);
    },

    /** Fin du code fourni. Après, c'est à toi de jouer! */

    showMessage: function (message) {
        document.getElementById('message').innerHTML = message;
        document.getElementById('go').style.display = ('none');
    },
    showButton: () => {
        document.getElementById('message').innerHTML = '';
        document.getElementById('go').style.display = ('block');
    },
    endGame: () => {
        app.showButton();
        alert(`Partie terminée. Votre score : ${app.sequence.length}`);
        app.sequence = [];
        app.indice = 0;
    },
    checkCell: (event) => {
        const clickedColor = event.target.id;

        app.bumpCell(clickedColor);

        console.log('indice checkcell ' + app.indice);
        if (clickedColor === app.sequence[app.indice] && app.sequence.length === (app.indice + 1)) {
            // if color is the same and 
            app.indice = 0;
            app.nextMove();
        }
        else if (clickedColor === app.sequence[app.indice]) {
            // if color is the same and indice are the same :
            app.indice += 1;
            app.timeOut();
            console.log('indice+1 ' + app.indice);
        }
        else if (clickedColor !== app.sequence[app.indice]) {
            // if color is false and indice the same
            app.endGame();
        }

    },
    nextMove: () => {
        clearTimeout(app.time);

        let random = Math.floor(Math.random() * 4);
        // add the corresponding color to the sequence
        app.sequence.push(app.colors[random]);
        app.simonSays(app.sequence);
    },
    timeOut: () => {
        app.time = setTimeout(() => {
            app.endGame();
        }, 5000);
    },
    time: '',
};


window.addEventListener('DOMContentLoaded', app.init);