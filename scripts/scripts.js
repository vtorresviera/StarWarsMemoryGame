// var memory_array2 = ["Luke Skywalker", "Luke Skywalker", "C-3PO", "C-3PO", "R2-D2", "R2-D2", "Darth Vader", "Darth Vader", "Leia Organa", "Leia Organa", "Owen Lars", "Owen Lars", "Beru Whitesun lars", "Beru Whitesun lars", "R5-D4", "R5-D4", "Biggs Darklighter", "Biggs Darklighter", "Obi-Wan Kenobi", "Obi-Wan Kenobi", "Anakin Skywalker", "Anakin Skywalker", "Wilhuff Tarkin", "Wilhuff Tarkin", "Chewbacca", "Chewbacca", "Han Solo", "Han Solo", "Greedo", "Greedo"];
// console.log("hard coded table");
// console.table(memory_array2);
// console.log(memory_array2.length);
var memory_array = [];
var fullDeck = [];
var memory_values = [];
var memory_tile_ids = [];
var numMatches = 2;
var score = 0;
document.getElementById('score').innerHTML = score;
var numIncorrectMatches = 0;
document.getElementById("numIncorrectMatches").innerHTML = numIncorrectMatches;


//Set up Ajax Call

// We need 15 total items from the Star Wars API (since we have 30 cards, and need two per matched set). Since the API is paginated at 10, it means we'll need to make multiple calls. To make this easy, we'll simply put this in a loop that loops twice, and makes a call in each loop. Since the loop keeps track of what number of loop it's on (called the "index"), we can use that number to pass in as our page number to the API. The first time the loop goes around, it'll ask the API for page 1, the second time, for page 2. 

var count = 0;
var memory_array = [];

for (i = 1; i < 3; i++) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        memory_array = memory_array.concat(JSON.parse(this.responseText).results);
        count++;
        if (count == 2) {
            buildDeck(memory_array);
        }
    }
    req.open("GET", "http://swapi.co/api/people/?page=" + i);
    req.send();
}

// The buildDeck function is used to create the array of cards we'll use to show to our player. There are two components to this. Our goal is to have two of each item in the deck, so we need to use a nested loop in order to easily do this. We'll loop through the first 15 items in the array that was given to us by the API, and for each of those items, we'll push it into the array twice (using the nested loop). Once this is done, we'll pass this newly created array (now with 30 total items - 2 each of the 15) to our buildCards function, which will actually put the cards on the page in HTML. It's also important to see that we need to shuffle the cards, since they'd otherwise all be next to each other (if you remember, we simply pushed two at a time into the array, so they're all in pairs right now). We'll use the knuthShuffle library, which will simply take our array and shuffle it up. That newly shuffled array is what's passed to the buildCards function.

function buildDeck(memory_array) {
    // var fullDeck = [];
    for (i = 0; i < 15; i++) {
        for (x = 0; x < numMatches; x++) {
            fullDeck.push(memory_array[i].name);
        }
    }
    console.log(fullDeck + " new Array");
    newBoard();
}


//shuffle function
Array.prototype.memory_tile_shuffle = function() {
    console.log("i entered shuffle");
    console.table(this);
    console.log("length: ", this.length);
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
    // buildArray();
    console.log("im in newboard");
    tiles_flipped = 0;
    var output = "";
    console.log("im going to call memory_array tile shuffle");
    // memory_array.memory_tile_shuffle();
    fullDeck.memory_tile_shuffle();
    console.log("came back from shuffle");
    console.table(fullDeck);
    console.log("memory_array length; ", memory_array.length);
    // for (i = 0; i < memory_array.length; i++) {
    for (i = 0; i < fullDeck.length; i++) {
        // output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + fullDeck[i] + '\')"></div>';

    }

    console.log("output content: " + output);
    document.getElementById("memory_board").innerHTML = output;
}

function memoryFlipTile(tile, val) {
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
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(../img/backcard.png) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(../img/backcard.png) no-repeat';
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
