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
  
}]);
