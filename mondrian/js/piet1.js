//setup canvas2
var canvas2 = document.getElementById('myCanvas2').getContext('2d'),


//create cells2 array
cells2 = [];

init2();
function init2() {
    for (var i=0; i<11; i++) {
        cells2[i] = [];
        for (var j=0; j<11; j++) {
            cells2[i][j] = 0;
        }
    }
    

    [

        [2, 2],[2, 3],[2, 4],[2, 5],[2, 6],[3, 2],[3, 3],[3, 4],[3, 5],[3, 6],[4, 2],[4, 3],[4, 4],[4, 5],[4, 6],[5, 2],[5, 3],[5, 4],[5, 5],[5, 6],[6, 2],[6, 3],[6, 4],[6, 5],[6, 6],[10,8],[10,9],[10,10],
    ]
    .forEach(function(point) {
        cells2[point[0]][point[1]] = 1;
    });
    
    update2();
}
function update2() {
    

    //results2s array
    var results2 = [];
    
   //array 
    function neighbors(x, y) {
        var amount = 0;
        
        function active(x, y) {
            return cells2[x] && cells2[x][y];
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
    
    cells2.forEach(function(row, x) {
        results2[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = neighbors(x, y);
            
            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }
            
            results2[x][y] = alive;
        });
    });
    
    cells2 = results2;
    
    draw2();
}

//draw2 each cell to canvas2
function draw2() {

    //square color and grid color
canvas2.strokeStyle = '#4d4d4d';
canvas2.fillStyle = '#ff6666';
    canvas2.clearRect(0, 0, 0, 0);
    cells2.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            canvas2.beginPath();
            canvas2.rect(x*30, y*30, 30, 30);
            if (cell) {

                canvas2.fill();
            } else {
                canvas2.stroke();
            }
        });
    });
    setTimeout(function() {update2();}, 200);
}