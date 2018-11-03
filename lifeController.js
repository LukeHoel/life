var myApp = angular.module('lifeApp',[]);
myApp.controller('lifeController', ['$scope', '$interval', function($scope, $interval) {
  var vm = this;
  vm.size = 50;
  vm.interval = 10;
  vm.paused = true;

  vm.blur = true;

  //generate grid
  vm.initGrid = function(){
    vm.grid = [];
    var row = new Array(vm.size).fill(0);
    for(var i = 0; i < vm.size; i ++){
      vm.grid.push([].concat(row));
    }
  }

  vm.initGrid();

  //simple constructs
  vm.constructs = [
    {
      name: "Block",
      cells:[
        {x:0,y:0},
        {x:1,y:0},
        {x:0,y:1},
        {x:1,y:1}
      ]
    },
    {
      name: "Glider",
      cells:[
        {x:1,y:0},
        {x:2,y:1},
        {x:0,y:2},
        {x:1,y:2},
        {x:2,y:2}
      ]
    },
    {
      name: "Small Exploder",
      cells:[
        {x:1,y:0},
        {x:0,y:1},
        {x:1,y:1},
        {x:2,y:1},
        {x:0,y:2},
        {x:2,y:2},
        {x:1,y:3}
      ]
    }
  ];

  vm.step = function(){
    var changes = [];//queue changes to grid
    for(var i = 0; i < vm.size; i ++){
      for(var o = 0; o < vm.size; o ++){
        var neighborCount = vm.countNeighbors(i,o);
        //do different things depending on whether cell is 'alive' or not
        switch(vm.grid[i][o]){
          case(1):
            if(neighborCount < 2 || neighborCount > 3){
              //the cell dies
              changes.push({x:i,y:o,value:0});
            }
          break;
          case(0):
            if(neighborCount == 3){
              //new cell created
              changes.push({x:i,y:o,value:1});
            }
          break;
        }
      }
    }
    for(var i = 0; i < changes.length; i ++){
      var change = changes[i];
      vm.grid[change.x][change.y] = change.value;
    }
  }

  vm.countNeighbors = function(row,column){
    var neighbors = 0;
    for(var i = -1; i < 2; i ++){
      for(var o = -1; o < 2; o ++){
        try{
          if(vm.grid[row+i][column+o] == 1 && !(i == 0 && o == 0)){
            neighbors ++;
          }
        }catch(err){}
      }
    }
    return neighbors;
  }

  vm.placeConstruct = function(x,y){
    var construct = vm.constructs[vm.selectedConstruct];
    for(var i = 0; i < construct.cells.length;i++){
      var cell = construct.cells[i];
      vm.grid[x+cell.y][y+cell.x] = 1;
    }
  }

  //start timer
  $interval(function(){
    if(vm.paused == false){vm.step();}
  }, vm.interval);

}]);
