class ConwaysGameOfLife{
    constructor() {
        this.rowSize = 0;
        this.columnSize = 0;
        this.generation = 0;
        this.arrayCurrent = [];
        this.arrayNew = [];
        this.animate;
        this.currentPattern = [];
        this.patterns = {none:"none",
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
    }

    // Erase board colors and reset current array
    clearBoard(){
        for(var i = 0; i < this.rowSize; i++){
            for(var j = 0; j < this.columnSize; j++){
                this.arrayCurrent[i][j] = 0;
            }
        }
        this.setGeneration(0);
        this.updateTable($('#board')[0].firstChild, this.arrayCurrent);
    }

    // Set generation(=iteration) value and message
    setGeneration(g){
        this.generation = g;
        document.getElementById("generation").innerHTML = "generation: " + g;
    }

    // Create an array with rowSize x columnSize
    createArray(){
        var array = [];
        for(var i = 0; i < this.rowSize; i++){
            array.push([]);
            for(var j = 0; j < this.columnSize; j++){
                array[i][j] = 0;
            }
        }
        return array;
    }

    // Execute an iteration
    // A cell with value 0 is dead and 1 is alive
    run(){
        // Sum of neighbours of a cell + cell itself
        var sum = 0;

        for(var i = 0; i < this.rowSize; i++){
            for(var j = 0; j < this.columnSize; j++){
                sum = this.sumNeighbours(this.arrayCurrent, i, j);

                // Live cell
                if(this.arrayCurrent[i][j] == 1){
                    // Any live cell with fewer than two live neighbours dies
                    // Any live cell with more than three live neighbours dies
                    if(sum < 3 || sum > 4){
                        this.arrayNew[i][j] = 0;
                    }
                    // Any live cell with two or three live neighbours
                    // lives on to the next generation
                    else
                        this.arrayNew[i][j] = 1;
                }
                // Dead cell
                else {
                    // Any dead cell with exactly three live neighbours
                    // becomes a live cell
                    if(sum == 3)
                        this.arrayNew[i][j] = 1;
                    else
                        this.arrayNew[i][j] = 0;
                }
            }
        }

        this.updateTable($('#board')[0].firstChild, this.arrayNew);

        // Copy the new array to the current array for next iteration
        for(var i = 0; i < this.rowSize; i++){
            for(var j = 0; j < this.columnSize; j++){
                this.arrayCurrent[i][j] = this.arrayNew[i][j];
            }
        }
        this.setGeneration(++this.generation);
    }

    // Sum of neighbours of a cell and cell itself
    sumNeighbours(array, x, y){
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
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Update the colors of board's cells
    updateTable(table, array){
        for(var i = 0; i < this.rowSize; i++){
            for(var j = 0; j < this.columnSize; j++){
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
    createTable(g, row, column, id){
        var table = document.createElement('table');

        this.rowSize = row;
        this.columnSize = column;
        this.arrayCurrent = this.setPattern();
        this.arrayNew = this.createArray();

        for (var i = 0; i < this.rowSize; i++){
            var tr = document.createElement('tr');
            for (var j = 0; j < this.columnSize; j++){
                var td = document.createElement('td');
                tr.appendChild(td);
                table.appendChild(tr);
            }
        }
        // document.body.appendChild(table);
        $(id).empty();
        $(id).append(table);

        // Add a click event listener to each cell
        $("td").click(function(event){
            if($('#usePattern').is(":checked")){
                g.pastePattern(g.arrayCurrent, event.target.parentNode.rowIndex, event.target.cellIndex);
            }
            else {
                g.toggleState(g.arrayCurrent, event.target.parentNode.rowIndex, event.target.cellIndex);
            }

            g.setGeneration(0);
        });
        $("td").mouseenter(function(event){
            // console.log(event.target.parentNode.rowIndex + ", " +
            // event.target.cellIndex);
            if($('#usePattern').is(":checked")){
                g.pastePattern(JSON.parse(JSON.stringify(g.arrayCurrent)), event.target.parentNode.rowIndex, event.target.cellIndex);
            }
        });
        $("body").keydown(function (event){
            if(event.which == 82){ // 'r' key
                if($('#usePattern').is(":checked")){

                    g.printArray(g.currentPattern,"txt");

                    if(g.currentPattern != "none")
                        g.currentPattern = g.rotateArray(g.currentPattern);

                    g.printArray(g.currentPattern,"txt");

                    g.pastePattern(JSON.parse(JSON.stringify(g.arrayCurrent)), event.target.parentNode.rowIndex, event.target.cellIndex);
                }
            }

        });
        // $("table").mouseenter(function(event){
            // g.currentPattern = JSON.parse(JSON.stringify(
            // g.patterns[$("input[name=pattern]:checked").val()]));
        // });
        $("table").mouseleave(function(event){
            g.updateTable($('#board')[0].firstChild, g.arrayCurrent);
        });

        this.setGeneration(0);

        // $('#board')[0].firstChild is html table #board
        this.updateTable($('#board')[0].firstChild, this.arrayCurrent);
    }

    rotateArray(array){
        var row = array.length;
        var column = array[0].length;
        var arrayNew = JSON.parse(JSON.stringify(array));
        for(var i = 0; i < row; i++){
            for(var j = 0; j < column; j++){
                arrayNew[i][j] = array[j][i];
            }
        }
        return arrayNew;
    }

    // Set an initial pattern to be created
    pastePattern(array ,x, y){
        var p = this.currentPattern;
        var row = 0;
        var column = 0;
        var newX = 0;
        var newY = 0;

        // Get the pattern chosen(radio button)
        p = this.patterns[$("input[name=pattern]:checked").val()];

        // No pattern
        if(p != "none"){
            row = p.length;
            column = p[0].length;
        }

        // Set the pattern
        for(var i = 0; i < row; i++){
            for(var j = 0; j < column; j++){
                newX = x + i;
                newY = y + j;

                // Infinite board representation (like global map)
                if(newX < 0)
                    newX = newX + this.rowSize;
                if(newY < 0)
                    newY = newY + this.columnSize;

                newX = newX % this.rowSize;
                newY = newY % this.columnSize;
                array[newX][newY] = p[i][j];
            }
        }
        this.updateTable($('#board')[0].firstChild, array);
    }

    // Set an initial pattern to be created
    setPattern(){
        var p = [];
        var row = 0;
        var column = 0;
        var array = this.createArray();

        // Get the pattern chosen(radio button)
        p = this.patterns[$("input[name=pattern]:checked").val()];

        // No initial pattern
        if(this.p != "none"){
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

    // Toggle state of board's cell
    toggleState(array, row, column){
        if(array[row][column] == 1)
            array[row][column] = 0;
        else
            array[row][column] = 1
        this.updateTable($('#board')[0].firstChild, array);
    }

    // Print a array
    printArray(array, id){
        var row = array.length;
        var column = array[0].length;
        // document.getElementById(id).innerHTML = "";
        for(var i = 0; i < row; i++){
            for(var j = 0; j < column; j++){
                document.getElementById(id).innerHTML += " " + array[i][j];
            }
            document.getElementById(id).innerHTML += "<br />"
        }
        document.getElementById(id).innerHTML += "<br />"
    }

    init(g){
        $("body").keydown(function (event){
            if(event.which == 78){ // 'n' key
                g.run();
            }
        });
        if($('#usePattern').is(":checked")){
            this.currentPattern = JSON.parse(JSON.stringify(this.patterns[$("input[name=pattern]:checked").val()]));
        }
    }

    startAnimation(g){
        this.animate = setInterval(frame, 100);
        function frame() {
            g.run();
        }
    }

    stopAnimation(){
        clearInterval(this.animate);
    }
}

// Program start point
var g = new ConwaysGameOfLife();
g.init(g);
