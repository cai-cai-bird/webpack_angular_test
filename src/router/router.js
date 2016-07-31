var myapp=require("../module/myapp");

var index_controller = require("../controller/index");

myapp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'../templateUrl/index.html',
            controller:index_controller
        })
        .otherwise({redirectTo:'/'});
}]);