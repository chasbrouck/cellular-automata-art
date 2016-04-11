//setup canvas4
var canvas4 = document.getElementById('myCanvas4').getContext('2d'),


//create cells4 array
cells4 = [];

init4();
function init4() {
    for (var i=0; i<11; i++) {
        cells4[i] = [];
        for (var j=0; j<11; j++) {
            cells4[i][j] = 0;
        }
    }
    

    [
        [2,7],[2,8],[2,9],[3,7],[3,8],[3,9],[3,7],[3,8],[3,9],
        
    ]
    .forEach(function(point) {
        cells4[point[0]][point[1]] = 1;
    });
    
    update4();
}
function update4() {
    

    //results4s array
    var results4 = [];
    
   //array 
    function neighbors(x, y) {
        var amount = 0;
        
        function active(x, y) {
            return cells4[x] && cells4[x][y];
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
    
    cells4.forEach(function(row, x) {
        results4[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = neighbors(x, y);
            
            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }
            
            results4[x][y] = alive;
        });
    });
    
    cells4 = results4;
    
    draw4();
}

//draw4 each cell to canvas4
function draw4() {

    //square color and grid color
canvas4.strokeStyle = '#4d4d4d';
canvas4.fillStyle = '#4d4d4d';
    canvas4.clearRect(0, 0, 0, 0);
    cells4.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            canvas4.beginPath();
            canvas4.rect(x*30, y*30, 30, 30);
            if (cell) {

                canvas4.fill();
            } else {
                canvas4.stroke();
            }
        });
    });
    setTimeout(function() {update4();}, 200);
}