var table = document.getElementById("table");
var rowSize = table.rows.length;
var columnSize = table.rows[0].cells.length;
             
// Player position
var pos = {x: 3, y: 3};
var moves = 0;
var hp = 0;
var array = [];

array = initializeWorld(10, createArray());

function getRndInteger(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function initializeWorld(initialHP, array){
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            if(getRndInteger(0,9) < 3)
                array[i][j].id = 1;
            else
                array[i][j].id = 0;
        }
    }
    // Initial player position
    pos.x = getRndInteger(0, rowSize - 1);
    pos.y = getRndInteger(0, columnSize - 1);
    array[pos.x][pos.y].id = 2;
    hp = initialHP;
    moves = 0;
    
    document.getElementById("moves").innerHTML = "moves: 0";
    document.getElementById("hp").innerHTML = "HP: " + initialHP;
    document.getElementById("iterate").disabled = false;
    document.getElementById("restart").style.visibility = "hidden";
    
    updateTable(table, array);
    return array;
}

function iterate(){
    // returns a number between 0 and 3
    // 0: north, 1: east, 2: south, 3: west
    var dir = getRndInteger(0, 3);
    
    var i = 0;
    var j = 0;
    var x = 0;
    var y = 0;

    switch(dir){
        case 0:
            i = -1;
            break;
        case 1:
            j = 1;
            break;
        case 2:
            i = 1;
            break;
        case 3:
            j = -1;
            break;
        default:
            return;
            break;
    }
    newx = pos.x + i;
    newy = pos.y + j;
    
    if(newx >= 0 && newx < rowSize){
        if(newy >= 0 && newy < columnSize){
            array[pos.x][pos.y] = 0;
            if(array[newx][newy] == 1){
                hp += 3;
            }
            array[newx][newy] = 2;
            pos.x = newx;
            pos.y = newy;
            updateTable(table);
        }
    }
    moves++;
    document.getElementById("moves").innerHTML = "moves: " + moves;
    hp--;
    document.getElementById("hp").innerHTML = "HP: " + hp;
    
    if(hp <= 0){
        document.getElementById("moves").innerHTML += " END";
        // document.getElementById("iterate").innerHTML = "restart";
        document.getElementById("iterate").disabled = true;
        document.getElementById("restart").style.visibility = "visible";
    }
}

function isOutOfBoard(x, y){
    if(x >= 0 && x < rowSize){
        if(y >= 0 && y < columnSize){
            return false;
        }
    }
    return true;
}

function updateTable(table, array){
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            // table.rows[i].cells[j].innerHTML = array[i][j];
            if(array[i][j].id == 1){
                table.rows[i].cells[j].style.backgroundColor = "green";
            }
            else if(array[i][j].id == 2){
                table.rows[i].cells[j].style.backgroundColor = "lightblue";
                table.rows[i].cells[j].innerHTML = "&#128522"
            }
            else if(array[i][j].id == -1)
                table.rows[i].cells[j].style.backgroundColor = "red";
            else {
                table.rows[i].cells[j].style.backgroundColor = "transparent";
                table.rows[i].cells[j].innerHTML = "";
            }
        }
    }
}

function createArray(){
    var array = [];
    for(var i = 0; i < rowSize; i++){
        array.push([]);
        for(var j = 0; j < columnSize; j++){
            array[i][j] = {id: i, direction: j, occupied: false};
        }
    }
    return array;
}

function printArray(array, id){
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < columnSize; j++){
            document.getElementById(id).innerHTML += " " + array[i][j].id;
        }
        document.getElementById(id).innerHTML += "<br/>";
    }
}

function movePlayer(keyPressed){
    var x = 0;
    var y = 0;
    switch(keyPressed){
        case 38: // North
            updatePlayersPosition(-1, 0);
            break;
        case 39: // East
            updatePlayersPosition(0, 1);
            break;
        case 40: // South
            updatePlayersPosition(1, 0);
            break;
        case 37: // West
            updatePlayersPosition(0, -1);
            break;
        default:
            break;
    }
}

function updatePlayersPosition(i, j){
    var temp = {};
    var newX = pos.x + i;
    var newY = pos.y + j;
    
    if(hp <= 0)
        return;
    
    // Store current positions's data
    Object.assign(temp, array[pos.x][pos.y]);
    
    if(!isOutOfBoard(newX, newY)){
        // Update last position's data
        array[pos.x][pos.y].id = 0;
        
        // Update player's position
        pos.x = newX;
        pos.y = newY;
        
        // Update new position's data
        Object.assign(array[pos.x][pos.y], temp);
        
        moves++;
        document.getElementById("moves").innerHTML = "moves: " + moves;
        hp--;
        document.getElementById("hp").innerHTML = "HP: " + hp;
        
        if(hp <= 0){
            document.getElementById("moves").innerHTML += " END";
            document.getElementById("iterate").disabled = true;
            document.getElementById("restart").style.visibility = "visible";
        }
    }  
    updateTable(table, array);
}

$("body").keydown(function (event){
    console.log(event.which);
    movePlayer(event.which);
});

