//setup canvas3
var canvas3 = document.getElementById('myCanvas3').getContext('2d'),


//create cells3 array
cells3 = [];

init3();
function init3() {
    for (var i=0; i<11; i++) {
        cells3[i] = [];
        for (var j=0; j<13; j++) {
            cells3[i][j] = 0;
        }
    }
    

    [
        [2,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[2,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3]
        
    ]
    .forEach(function(point) {
        cells3[point[0]][point[1]] = 1;
    });
    
    update3();
}
function update3() {
    

    //results3s array
    var results3 = [];
    
   //array 
    function neighbors(x, y) {
        var amount = 0;
        
        function active(x, y) {
            return cells3[x] && cells3[x][y];
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
    
    cells3.forEach(function(row, x) {
        results3[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = neighbors(x, y);
            
            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }
            
            results3[x][y] = alive;
        });
    });
    
    cells3 = results3;
    
    draw3();
}

//draw3 each cell to canvas3
function draw3() {

    //square color and grid color
canvas3.strokeStyle = '#4d4d4d';
canvas3.fillStyle = '#6D828D';
    canvas3.clearRect(0, 0, 0, 0);
    cells3.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            canvas3.beginPath();
            canvas3.rect(x*30, y*30, 30, 30);
            if (cell) {

                canvas3.fill();
            } else {
                canvas3.stroke();
            }
        });
    });
    setTimeout(function() {update3();}, 200);
}