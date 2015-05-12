/*---EXAMPLE-----

var Tile = function(x, y, face) {
    this.x = x;
    this.y = y;
    this.face = face;
    this.width = 70;
};

Tile.prototype.drawFaceDown = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.width, 10);
    image(getImage("avatars/leaf-green"), this.x, this.y, this.width, this.width);
};

Tile.prototype.drawFaceUp = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.width, 10);
    image(this.face, this.x, this.y, this.width, this.width);
};

Tile.prototype.isUnderMouse = function(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
        y >= this.y && y <= this.y + this.width;
};

// Declare an array of all possible faces
var faces = [
    getImage("avatars/leafers-seed"),
    getImage("avatars/leafers-seedling"),
    getImage("avatars/leafers-sapling"),
    getImage("avatars/leafers-tree"),
    getImage("avatars/leafers-ultimate"),
    getImage("avatars/marcimus"),
    getImage("avatars/mr-pants"),
    getImage("avatars/mr-pink"),
    getImage("avatars/old-spice-man"),
    getImage("avatars/robot_female_1")
];

// Make an array which has 2 of each, then randomize it
var possibleFaces = faces.slice(0);
var selected = [];
for (var i = 0; i < 10; i++) {
    // Randomly pick one from the array of remaining faces
    var randomInd = floor(random(possibleFaces.length));
    var face = possibleFaces[randomInd];
    // Push 2 copies onto array
    selected.push(face);
    selected.push(face);
    // Remove from array
    possibleFaces.splice(randomInd, 1);
}

// Now we need to randomize the array
selected.sort(function() {
    return 0.5 - Math.random();
});

// Create the tiles
var tiles = [];
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
        tiles.push(new Tile(i * 78 + 10, j * 78 + 40, selected.pop()));
    }
}

background(255, 255, 255);

// Now draw them face up
for (var i = 0; i < tiles.length; i++) {
    tiles[i].drawFaceDown();
}

mouseClicked = function() {
    // check if mouse was inside a tile
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].isUnderMouse(mouseX, mouseY)) {
            tiles[i].drawFaceUp();
        }
    }
};
*/

/*--Timer function--*/
<script>
(function(){

$("#btn").click(function(){
switch($(this).html().toLowerCase())
{

case "start":
$("#t").timer({
action: 'start', 
seconds: 0
});
$(this).html("Pause");
$("input[name='s']").attr("disabled", "disabled");
$("#t").addClass("badge-important");
break;
  
case "resume":
$("#t").timer('resume');
$(this).html("Pause")
$("#t").addClass("badge-important");
break;
  
case "pause":
//you can specify action via object//
$("#t").timer({action: 'pause'});
$(this).html("Resume")
$("#t").removeClass("badge-important");
break;

}
});

})();
</script>

