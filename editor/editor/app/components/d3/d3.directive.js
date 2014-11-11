var app = angular.module('myApp.d3.directive', []);

app.directive('directedGraph', function($window){
    var d3 = $window.d3;
    var directedGraph = d3.directed_graph(d3, GAME);
    var chart = directedGraph();
    
    return{
      restrict:'EA',
      template:'',
      link: function(scope, elem, attrs){
        
        chart.focus(attrs.focus)
        
        d3.select(elem[0]).call(chart);
      }
   };
});