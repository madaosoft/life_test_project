var table = document.getElementById("table");
var rowSize = table.rows.length;
var columnSize = table.rows[0].cells.length;

document.getElementById("text").innerHTML = 
"row: " + rowSize.toString() + " column: " + columnSize.toString();

var array = [[0,0,0,0,1,0,0,1],
             [0,1,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,0],
             [0,1,0,0,0,0,0,0]];
             
// Player position
var pos = {x: 3, y: 3};
var iteration = 0;
var hp = 0;

initializeWorld(10);

document.getElementById("text").innerHTML +=
 "<br/>x: " + pos.x + " y: " + pos.y;
 
$("td").click(function(e){
    getId(this);
});

function  getId(element) {
        alert("row" + element.parentNode.rowIndex + 
    " - column" + element.cellIndex);
}
 
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function initializeWorld(initialHP){
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            if(getRndInteger(0,9) < 3)
                array[i][j] = 1;
            else
                array[i][j] = 0;
        }
    }
    // Initial player position
    pos.x = getRndInteger(0,rowSize-1);
    pos.y = getRndInteger(0,columnSize-1);
    array[pos.x][pos.y] = 2;
    hp = initialHP;
    
    document.getElementById("iteration").innerHTML = "iteration: 0";
    document.getElementById("hp").innerHTML = "HP: " + initialHP;
    document.getElementById("iterate").disabled = false;
    document.getElementById("restart").style.visibility = "hidden";
    
    updateTable(table);
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
    iteration++;
    document.getElementById("iteration").innerHTML = "iteration: " + iteration;
    hp--;
    document.getElementById("hp").innerHTML = "HP: " + hp;
    
    if(hp <= 0){
        document.getElementById("iteration").innerHTML += " END";
        // document.getElementById("iterate").innerHTML = "restart";
        document.getElementById("iterate").disabled = true;
        document.getElementById("restart").style.visibility = "visible";
    }
}

function updateTable(table){
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            // table.rows[i].cells[j].innerHTML = array[i][j];
            if(array[i][j] == 1){
                table.rows[i].cells[j].style.backgroundColor = "green";
                
            }
            else if(array[i][j] == 2){
                table.rows[i].cells[j].style.backgroundColor = "lightblue";
                table.rows[i].cells[j].innerHTML = "&#128522"
            }
            else if(array[i][j] == -1)
                table.rows[i].cells[j].style.backgroundColor = "red";
            else {
                table.rows[i].cells[j].style.backgroundColor = "transparent";
                table.rows[i].cells[j].innerHTML = "";
            }
        }
    }
}

