//setup canvas
var canvas = document.getElementById('myCanvas').getContext('2d'),


//create cells array
cells = [];

init();
function init() {
    for (var i=0; i<11; i++) {
        cells[i] = [];
        for (var j=0; j<13; j++) {
            cells[i][j] = 0;
        }
    }
    

    [
        [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[5,9],[6,9],[7,9],[5,10],[6,10],[7,10],[5,11],[6,11],[7,11],[5,12],[6,12],[7,12]
        
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
canvas.fillStyle = '#4A8F3F';
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