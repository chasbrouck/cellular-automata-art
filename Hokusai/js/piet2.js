//setup canvas
var canvas = document.getElementById('myCanvas').getContext('2d'),


//create cells array
cells = [];

init();
function init() {
    for (var i=0; i<13; i++) {
        cells[i] = [];
        for (var j=0; j<11; j++) {
            cells[i][j] = 0;
        }
    }
    

    [
       [1,1],[2,1],[3,1],[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[11,6],[12,6],[10,6]
        
    ]
    .forEach(function(point) {
        cells[point[0]][point[1]] = 1;
    });
    
    update();
}



//update function
function update() {
    

    //results array
    var result = [];
    
   //array 
    function neighbors(x, y) {
        var amount = 0;
        
        function active(x, y) {
            return cells[x] && cells[x][y];
        }
        
        //rules for neighbors
        if (active(x-1, y-1)) amount++;
        if (active(x,   y-1)) amount++;
        if (active(x+1, y-1)) amount++;
        if (active(x-1, y  )) amount++;
        if (active(x+1, y  )) amount++;
        if (active(x-1, y+1)) amount++;
        if (active(x,   y+1)) amount++;
        if (active(x+1, y+1)) amount++;
        
        return amount;
    }
    

    //check for neighbors
    
    cells.forEach(function(row, x) {
        result[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = neighbors(x, y);
            
            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }
            
            result[x][y] = alive;
        });
    });
    
    cells = result;
    
    draw();
}


//draw each cell to canvas
function draw() {

    //square color and grid color
canvas.strokeStyle = '#4d4d4d';
canvas.fillStyle = '#79A79D';
    canvas.clearRect(0, 0, 0, 0);
    cells.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            canvas.beginPath();
            canvas.rect(x*30, y*30, 30, 30);
            if (cell) {

                canvas.fill();
            } else {
                canvas.stroke();
            }
        });
    });
    setTimeout(function() {update();}, 200);
}