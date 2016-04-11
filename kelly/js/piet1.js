//setup canvas2
var canvas2 = document.getElementById('myCanvas2').getContext('2d'),


//create cells2 array
cells2 = [];

init2();
function init2() {
    for (var i=0; i<11; i++) {
        cells2[i] = [];
        for (var j=0; j<13; j++) {
            cells2[i][j] = 0;
        }
    }
    

    [

       [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[7,4],[8,4],[9,4],[10,4],[7,5],[8,5],[9,5],[10,5],[7,6],[8,6],[9,6],[10,6],[7,7],[8,7],[9,7],[10,7],[7,8],[8,8],[9,8],[10,8],[7,9],[8,9],[9,9],[10,9],[7,10],[8,10],[9,10],[10,10],[7,11],[8,11],[9,11],[10,11],[7,12],[8,12],[9,12],[10,12],[10,13],[9,13],[8,13],[7,13]
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
canvas2.fillStyle = '#4562B2';
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