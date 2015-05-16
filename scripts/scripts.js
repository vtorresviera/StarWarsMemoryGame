//Global Variables
var memory_array = [];
var fullDeck = [];
var memory_values = [];
var memory_tile_ids = [];
// variable that tells the inside loop reading 15 elements of array received to push value twice to fullDeck array (30).
var numMatches = 2;
var score = 0;
document.getElementById('score').innerHTML = score;
var numIncorrectMatches = 0;
document.getElementById("numIncorrectMatches").innerHTML = numIncorrectMatches;


//Ajax calls to swapi API Ajax
//Two Ajax calls are made in order to get 2 pages of the people objects.
//memory_array will hold the object array received from API.
//count variable is counting the pages received.


var count = 0;
var memory_array = [];

for (i = 1; i < 3; i++) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        memory_array = memory_array.concat(JSON.parse(this.responseText).results);
        count++;
        if (count == 2) {
            //when we receive the 2 pages we go to create the 30 cards deck
            buildDeck(memory_array);
        }
    }
    req.open("GET", "http://swapi.co/api/people/?page=" + i);
    req.send();
}

// Creating the 30 cards deck
function buildDeck(memory_array) {
    // loop runs 15 times because we 15 characters
    for (i = 0; i < 15; i++) {
        // write 2 times the value read in the full deck array
        for (x = 0; x < numMatches; x++) {
            fullDeck.push(memory_array[i].name);
        }
    }
    newBoard();
}


//shuffle  Full Deck Array function
Array.prototype.memory_tile_shuffle = function() {
    
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}




function newBoard() {
    tiles_flipped = 0;
    var output = "";
    //sending Full Deck array to shuffle
    fullDeck.memory_tile_shuffle();

    //loop for creating the cards on the board dynamically <div for the cards
    for (i = 0; i < fullDeck.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + fullDeck[i] + '\')"></div>';

    }

    document.getElementById("memory_board").innerHTML = output;
}

function memoryFlipTile(tile, val) {
    //uses memory_values array.  It is a 2 element array that contains both flipped cards id and value
    if (tile.innerHTML == "" && memory_values.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if (memory_values[0] == memory_values[1]) {
                tiles_flipped += 2;
                //add to score
                score += 1;
                document.getElementById('score').innerHTML = score;
                console.log("current score:", score);
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared
                //if (tiles_flipped == memory_array.length) {
                if (score == 15) {
                    alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    score = 0;
                    document.getElementById('score').innerHTML = score;
                    numIncorrectMatches = 0;
                    document.getElementById("numIncorrectMatches").innerHTML = numIncorrectMatches;
                    newBoard();
                    restart();
                }
            } else {
                function flip2Back() {
                    //uses memory_tiles_ids array to put them back in the same spot
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(img/backcard.png) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(img/backcard.png) no-repeat';
                    tile_2.innerHTML = "";
                    //add to incorrect matches 
                    numIncorrectMatches += 1;
                    document.getElementById("numIncorrectMatches").innerHTML = numIncorrectMatches;
                    console.log("current incorrect matches:", numIncorrectMatches);
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}

function restart() {
    score = 0;
    document.getElementById('score').innerHTML = score;
    numIncorrectMatches = 0;
    document.getElementById("numIncorrectMatches").innerHTML = numIncorrectMatches;
    newBoard();
    hourcounter = 0;
    minutecounter = 0;
    secondcounter = 0;
    tenthsecondcounter = 0;
    hundredthsecondcounter = 0;
    //clearing timer
    clearInterval(intervalhandle);
    intervalhandle=window.setInterval(function() {checktimedispatcher() },10);
}
