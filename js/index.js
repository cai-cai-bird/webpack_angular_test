require("../css/css.css");
var style=require("../css/style.css");
var myapp=require("./angular_module");
myapp.controller("firstController",['$scope',function($scope){
	$scope.name="aass";
}])