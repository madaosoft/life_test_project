var originalTable = document.getElementById("originalTable");
var modifiedTable = document.getElementById("modifiedTable");
var rowSize = originalTable.rows.length;
var columnSize = originalTable.rows[0].cells.length;

document.getElementById("text").innerHTML = 
"row: " + rowSize.toString() + " column: " + columnSize.toString();

var array = [[0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,2,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0]];
             
updateTable(originalTable);
updateTable(modifiedTable);

function showRange(x, y) {
    var rows = document.getElementById("modifiedTable").rows[0];
    var temp = 0;
    
    for(var j = -1; j < 2; j++){
        for(var i = -1; i < 2; i++){
            if(i != 0 || j != 0)
                array[x+i][y+j] = -1;
        }
    }
    array[x][y+2] = -1;
    array[x][y-2] = -1;
    array[x+2][y] = -1;
    array[x-2][y] = -1;
    updateTable(modifiedTable);
}

function updateTable(table) {
    for(var i = 0; i < rowSize; i++){           
        for(var j = 0; j < columnSize; j++){
            // table.rows[i].cells[j].innerHTML = array[i][j];
            if(array[i][j] == 1)
                table.rows[i].cells[j].style.backgroundColor = "black";
            else if(array[i][j] == 2)
                table.rows[i].cells[j].style.backgroundColor = "lightblue";
            else if(array[i][j] == -1)
                table.rows[i].cells[j].style.backgroundColor = "red";
            else
                table.rows[i].cells[j].style.backgroundColor = "white";
        }
    }
}

$('originalTable').on('click', '.btn', function()
{//replace table selector with an id selector, if you are targetting a specific table
    var row = $(this).closest('tr'),
        cells = row.find('td'),
        btnCell = $(this).parent();
    //set to work, you have the cells, the entire row, and the cell containing the button.
    console.log("aaa");
});