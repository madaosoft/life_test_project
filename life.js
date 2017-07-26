var board = document.getElementById("board");
var rowSize = board.rows.length;
var columnSize = board.rows[0].cells.length;
var generation = 0;
var running = false;
                  
var arrayCurrent = [[0,0,1,0,0,0,0,0],
                    [1,0,1,0,0,0,0,0],
                    [0,1,1,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
             
var arrayNew = [[1,1,0,0,1,0,0,0],
                [1,1,0,0,1,0,0,0],
                [0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]];
             
updateTable(board, arrayCurrent);

$("td").click(function(e){
    // getId(this);
    toggleState(arrayCurrent, this.parentNode.rowIndex, this.cellIndex);
});

// var isDragging = false;
// $("td")
// .mousedown(function() {
    // isDragging = true;
    // toggleState(arrayCurrent, this.parentNode.rowIndex, this.cellIndex);    
// })
// .mousemove(function() {
    // if(isDragging)
        // toggleState(arrayCurrent, this.parentNode.rowIndex, this.cellIndex);
 // })
// .mouseup(function() {
    // isDragging = false;
// });

$("body").keydown(function (event){
    if(event.which){
        run();
    }
});

function getId(element) {
    alert("row" + element.parentNode.rowIndex + 
    " - column" + element.cellIndex);
}

function toggleState(array, row, column){
    if(array[row][column] == 1)
        array[row][column] = 0;
    else
        array[row][column] = 1
    updateTable(board, array);
}

function clearBoard(){
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            arrayCurrent[i][j] = 0;
        }
    }
    generation = 0;
    document.getElementById("generation").innerHTML = 0;
    updateTable(board, arrayCurrent);
}

function createArray(){
    var array = [];
    for(var i = 0; i < rowSize; i++){
        array.push([]);
        for(var j = 0; j < columnSize; j++){
            array[i][j] = 0;
        }
    }
    return array;
}

function pauseSimulation(){
    running = false;
}

function run(){
    var sum = 0;
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            sum = sumNeighbours(arrayCurrent, i, j);
            if(arrayCurrent[i][j] == 1){
                if(sum < 3 || sum > 4){
                    arrayNew[i][j] = 0;
                }
                else
                    arrayNew[i][j] = 1;
            }
            else { // dead cell
                if(sum == 3)
                    arrayNew[i][j] = 1;
                else
                    arrayNew[i][j] = 0;
            }
        }
    }
    updateTable(board, arrayNew);
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            arrayCurrent[i][j] = arrayNew[i][j];
        }
    }
    document.getElementById("generation").innerHTML = ++generation;
}

function sumNeighbours(array, x, y){
    var sum = 0;
    var length = array.length;
    var newX = 0;
    var newY = 0;
    
    for(var i = -1; i < 2; i++){           
        for(var j = -1; j < 2; j++){
            newX = x + i;
            newY = y + j;
            
            // Infinite board representation
            if(newX < 0)
                newX = newX + length;
            if(newY < 0)
                newY = newY + length;
            
            newX = newX % length;
            newY = newY % length;
            
            sum = sum + array[newX][newY];
        }
    }
    return sum;
}

function getRndInteger(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function updateTable(table, array){
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            // table.rows[i].cells[j].innerHTML = array[i][j];
            if(array[i][j] == 1){
                table.rows[i].cells[j].style.backgroundColor = "green";
            }
            else {
                table.rows[i].cells[j].style.backgroundColor = "transparent";
            }
        }
    }
}
