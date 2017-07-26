// var board = document.getElementById("board");
var rowSize = 0; //board.rows.length;
var columnSize = 0; //board.rows[0].cells.length;
var generation = 0;
var running = false;
var arrayCurrent = [];
var arrayNew = [];

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
                beacon:[[1,1,0,0],
                        [1,1,0,0],
                        [0,0,1,1],
                        [0,0,1,1]],
                glider:[[0,0,1],
                        [1,0,1],
                        [0,1,1]],
                lwss:[[1,0,0,1,0],
                      [0,0,0,0,1],
                      [1,0,0,0,1],
                      [0,1,1,1,1]]}

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
// function pauseSimulation(){
    // running = false;
// }

// Toggle state of board's cell
function toggleState(array, row, column){
    if(array[row][column] == 1)
        array[row][column] = 0;
    else
        array[row][column] = 1
    updateTable($('#board')[0].firstChild, array);
}

// Erase board colors and reset current array
function clearBoard(){
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < columnSize; j++){
            arrayCurrent[i][j] = 0;
        }
    }
    setGeneration(0);
    updateTable($('#board')[0].firstChild, arrayCurrent);
}

// Set generation(=iteration) value and message
function setGeneration(g){
    generation = g;
    document.getElementById("generation").innerHTML = "generation: " + g;
}

// Create an array with rowSize x columnSize
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

// Execute an iteration
// A cell with value 0 is dead and 1 is alive
function run(){
    // Sum of neighbours of a cell + cell itself
    var sum = 0;

    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < columnSize; j++){
            sum = sumNeighbours(arrayCurrent, i, j);

            // Live cell
            if(arrayCurrent[i][j] == 1){
                // Any live cell with fewer than two live neighbours dies
                // Any live cell with more than three live neighbours dies
                if(sum < 3 || sum > 4){
                    arrayNew[i][j] = 0;
                }
                // Any live cell with two or three live neighbours
                // lives on to the next generation
                else
                    arrayNew[i][j] = 1;
            }
            // Dead cell
            else {
                // Any dead cell with exactly three live neighbours
                // becomes a live cell
                if(sum == 3)
                    arrayNew[i][j] = 1;
                else
                    arrayNew[i][j] = 0;
            }
        }
    }

    updateTable($('#board')[0].firstChild, arrayNew);

    // Copy the new array to the current array for next iteration
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < columnSize; j++){
            arrayCurrent[i][j] = arrayNew[i][j];
        }
    }
    setGeneration(++generation);
}

// Sum of neighbours of a cell and cell itself
function sumNeighbours(array, x, y){
    var sum = 0;
    var row = array.length;
    var column = array[0].length;
    var newX = 0;
    var newY = 0;

    for(var i = -1; i < 2; i++){
        for(var j = -1; j < 2; j++){
            newX = x + i;
            newY = y + j;

            // Infinite board representation (like global map)
            if(newX < 0)
                newX = newX + row;
            if(newY < 0)
                newY = newY + column;

            newX = newX % row;
            newY = newY % column;

            sum = sum + array[newX][newY];
        }
    }
    return sum;
}

// Get a number between min and max
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update the colors of board's cells
function updateTable(table, array){
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < columnSize; j++){
            if(array[i][j] == 1){
                table.rows[i].cells[j].style.backgroundColor = "green";
            }
            else {
                table.rows[i].cells[j].style.backgroundColor = "transparent";
            }
        }
    }
}

// Create a html table
function createTable(row, column, id){
    var table = document.createElement('table');

    rowSize = row;
    columnSize = column;
    arrayCurrent = setPattern();
    arrayNew = createArray();

    for (var i = 0; i < rowSize; i++){
        var tr = document.createElement('tr');
        for (var j = 0; j < columnSize; j++){
            var td = document.createElement('td');
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }
    // document.body.appendChild(table);
    $(id).empty();
    $(id).append(table);

    // Add a click event listener to each cell
    $("td").click(function(e){
        toggleState(arrayCurrent, this.parentNode.rowIndex, this.cellIndex);
        setGeneration(0);
    });

    setGeneration(0);

    // $('#board')[0].firstChild is html table #board
    updateTable($('#board')[0].firstChild, arrayCurrent);
}

// Set an initial pattern to be created
function setPattern(){
    var p = [];
    var row = 0;
    var column = 0;
    var id = "";
    var array = createArray();

    // Get the pattern chosen(radio button)
    p = patterns[$("input[name=pattern]:checked").val()];

    // No initial pattern
    if(p != "none"){
        row = p.length;
        column = p[0].length;
    }

    // Set the pattern
    for(var i = 0; i < row; i++){
        for(var j = 0; j < column; j++){
            array[i+1][j+1] = p[i][j];
        }
    }
    return array;
}

// Print a array
function printArray(array, id,i,j){
    document.getElementById(id).innerHTML += i+","+j+"<br />";
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < columnSize; j++){
            document.getElementById(id).innerHTML += " " + array[i][j];
        }
        document.getElementById(id).innerHTML += "<br />"
    }
    document.getElementById(id).innerHTML += "<br />"
}

function main(){
    $("body").keydown(function (event){
        if(event.which == 78){ // 'n' key
            run();
        }
    });
}
main();
