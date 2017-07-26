// var board = document.getElementById("board");
var rowSize = 0; //board.rows.length;
var columnSize = 0; //board.rows[0].cells.length;
var generation = 0;
var running = false;
var arrayCurrent;
var arrayNew;
             
var patterns = {none:"none",
                block:[[1,1],
                       [1,1]],
                beehive:[[0,1,1,0],
                         [1,0,0,1],
                         [0,1,1,0]],
                loaf:[[0,1,1,0],
                      [1,0,0,1],
                      [0,1,0,1],
                      [0,0,1,0]],
                blinker:[[0,1,0],
                         [0,1,0],
                         [0,1,0]],
                toad:[[0,0,1,0],
                      [1,0,0,1],
                      [1,0,0,1],
                      [0,1,0,0]],
                beacon:}

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

function getId(element) {
    alert("row" + element.parentNode.rowIndex + 
    " - column" + element.cellIndex);
}

function toggleState(array, row, column){
    if(array[row][column] == 1)
        array[row][column] = 0;
    else
        array[row][column] = 1
    updateTable($('#board')[0].firstChild, array);
}

function clearBoard(){
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            arrayCurrent[i][j] = 0;
        }
    }
    setGeneration(0);
    updateTable($('#board')[0].firstChild, arrayCurrent);
}

function setGeneration(g){
    generation = g;
    document.getElementById("generation").innerHTML = "generation: " + g;
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
    updateTable($('#board')[0].firstChild, arrayNew);
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            arrayCurrent[i][j] = arrayNew[i][j];
        }
    }
    setGeneration(++generation);
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

function createTable(row, column, id){
    rowSize = row;
    columnSize = column;
    arrayCurrent = setPattern();
    arrayNew = createArray();
    var table = document.createElement('table');
    
    for (var i = 0; i < row; i++){
        var tr = document.createElement('tr');   
        for (var j = 0; j < column; j++){
            var td = document.createElement('td');
            // var txt = document.createTextNode('txt');

            // td.appendChild(txt);
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }
    // document.body.appendChild(table);
    $(id).empty();
    $(id).append(table);
    
    $("td").click(function(e){
        // getId(this);
        toggleState(arrayCurrent, this.parentNode.rowIndex, this.cellIndex);
        setGeneration(0);
    });
    
    setGeneration(0);
    updateTable($('#board')[0].firstChild, arrayCurrent);
}

function setPattern(){
    var p = [];
    var row = 0;
    var column = 0;
    var id = "";
    
    // switch($("input[name=pattern]:checked").val()){
        // case "none":
            // break;
        // case "1":
            // p = patterns.block;
            // break;            
    // }
    
    // console.log($("input[name=pattern]:checked").val());
    p = patterns[$("input[name=pattern]:checked").val()];
    
    if(p != "none"){
        row = p.length;
        column = p[0].length; 
    }
    
    // console.log("row: " + row + " column: " + column);
    
    arrayCurrent = createArray();
    for(var i = 0; i < row; i++){           
        for(var j = 0; j < column; j++){
            arrayCurrent[i+1][j+1] = p[i][j];
        }
    }
    return arrayCurrent;
}

function main(){
    $("body").keydown(function (event){
        if(event.which == 78){ // 'n' key
            run();
        }
    });
    console.log($("input[name=pattern]:checked").val());
}
main();
