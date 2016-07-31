require("../css/css.css");
require("../css/style.css");
var myapp=require("../module/myapp");
myapp.controller("indexController",['$scope',function($scope){
    $scope.name="webpack_angular_test";
}]);

module.exports=function () {

}
