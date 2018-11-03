var myApp = angular.module('lifeApp',[]);
myApp.controller('lifeController', ['$scope', function($scope) {
  var vm = this;
  vm.grid = [];
  vm.size = 20;
  vm.cutoff = .95;

  //generate grid
  for(var i = 0; i < vm.size; i ++){
    var row = [];
    for(var o = 0; o < vm.size; o ++){
      //we want only binary values
      row.push(Math.random() >= vm.cutoff ? 1 : 0);
    }
    vm.grid.push(row);
  }

  vm.step = function(){
    for(var i = 0; i < vm.size; i ++){
      for(var o = 0; o < vm.size; o ++){
        var neighborCount = countNeighbors(i,o);
        //do different things depending on whether cell is 'alive' or not
        switch(vm.grid[i][o]){
          case(0):
            if(neighborCount < 2 || neighborCount > 3){
              //the cell dies
              vm.grid[i,o] = 0;
            }
          break;
          case(1):
            if(neighborCount == 3){
              //new cell created
              vm.grid[i,o] = 1;
            }
          break;
        }
      }
    }
  }

  var countNeighbors = function(row,column){
    var neighbors = 0;
    for(var i = -1; i < 2; i ++){
      for(var o = -1; o < 2; o ++){
        if(vm.grid[i,o]){
          neighbors ++;
        }
      }
    }
    return neighbors;
  }

}]);
