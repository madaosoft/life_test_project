var originalTable = document.getElementById("originalTable");
var modifiedTable = document.getElementById("modifiedTable");
var rowSize = originalTable.rows.length;
var columnSize = originalTable.rows[0].cells.length;

document.getElementById("text").innerHTML = 
"row: " + rowSize.toString() + " column: " + columnSize.toString();

var array = [4,2,7,5,6,1,9,0,3,8];
updateTable(originalTable);
updateTable(modifiedTable);

function updateTable(table) {
    for(var i = 0; i < columnSize; i++){           
        table.rows[0].cells[i].innerHTML = array[i];
    }
}

function bubbleSort() {
    var rows = document.getElementById("originalTable").rows[0];
    var temp = 0;
    
    for(var j = 0; j < columnSize; j++) {
        for(var i = j; i >= 0; i--){
            if(array[i] < array[i-1]){
                temp = array[i-1];
                array[i-1] = array[i];
                array[i] = temp;
                
                document.getElementById("text").innerHTML = array;
            }
        }
    }
}

function quickSort(A, lo, hi) {
    if(lo < hi){
        var p = partition(A, lo, hi);
        quickSort(A, lo, p);
        quickSort(A, p + 1, hi);
    }
    document.getElementById("text").innerHTML = array;
}

function partition(A, lo, hi) {
    var temp = 0;
    var pivot = A[lo];
    var i = lo - 1;
    var j = hi + 1;
    while(true) {
        do {
            i = i + 1;
        }
        while (A[i] < pivot);

        do {
            j = j - 1;
        }
        while (A[j] > pivot);

        if(i >= j)
            return j;
        
        temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
}