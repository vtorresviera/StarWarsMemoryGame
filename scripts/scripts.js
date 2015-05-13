var memory_array = ["Luke Skywalker", "Luke Skywalker", "C-3PO", "C-3PO", "R2-D2", "R2-D2", "Darth Vader", "Darth Vader", "Leia Organa", "Leia Organa", "Owen Lars", "Owen Lars", "Beru Whitesun lars", "Beru Whitesun lars", "R5-D4", "R5-D4", "Biggs Darklighter", "Biggs Darklighter", "Obi-Wan Kenobi", "Obi-Wan Kenobi", "Anakin Skywalker", "Anakin Skywalker", "Wilhuff Tarkin", "Wilhuff Tarkin", "Chewbacca", "Chewbacca", "Han Solo", "Han Solo", "Greedo", "Greedo"];
var memory_values = [];
var memory_tile_ids = [];
//shuffle function
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
    console.log("im in newBoard function");
    tiles_flipped = 0;
    var output = "";
    memory_array.memory_tile_shuffle();

    for (i = 0; i < memory_array.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
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
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared
                if (tiles_flipped == memory_array.length) {
                    alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
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
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}
