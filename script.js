var app = angular.module('mainApp', ['ngRoute']);
var url = 'http://193.191.187.14:10518/HousingService-rest/rooms';//http://193.191.187.14:10518/HousingService-rest/rooms
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when('/about', {
            templateUrl: 'about.html'
        })
        .when('/rooms', {
            templateUrl: 'rooms.html'
        })
        .when('/addRoom', {
            templateUrl: 'addRoom.html'
        })
        .when('/updateRoom', {
            templateUrl: 'updateRoom.html'
        });
});
app.controller('navCtrl', function ($scope, $http, $window) {
    $scope.message = "Welcome to Housing service rooms rest application";
    $scope.getUpdateRoomForm = function getUpdateRoomForm(id) {
        $http.get(url + "/" + id.toString())
            .success(function (data, status, headers, config) {
                $scope.room = data;
                $window.location.href = '#/updateRoom';
            })
            .error(function (error, status, headers, config) {
                console.log(status);
                console.log("Error occured");
            });
        console.log($scope.room);
    }
});

app.controller('roomsCtrl', function ($scope, $http, $window) {
    $http({
        method: "GET",
        url: url
    }).then(function mySucces(response) {
        $scope.roomsList = response.data;
    }, function myError(response) {
        $scope.roomsList = response.statusText;
    });
    $scope.deleteRoom = function (id) {
        $scope.room = {id: id};
        console.log(JSON.stringify($scope.room));
        $http.post(url + "/delete", JSON.stringify($scope.room))
            .success(function (status) {
                console.log(status);
                $window.location.reload(false);
            })
            .error(function (error, status) {
                console.log(error.toString());
                console.log("Error occured");
            });
    }
});

app.controller('roomAddCtrl', function ($scope, $http) {
    console.log("postingfsdafsadf data....");
    $scope.submitForm = function submitForm() {
        console.log("posting data");
        $http.post(url, JSON.stringify($scope.room))
            .success(function (status) {
                console.log(status);
            })
            .error(function (error, status) {
                console.log(error.toString());
                console.log("Error occured");
            });
    };
});

app.controller('roomUpdateCtrl', function ($scope, $http, $window) {
    $scope.updateRoom = function updateRoom() {
        delete $scope.room.freeSpace; //need delete because domain hasn't got this field.
        console.log(JSON.stringify($scope.room));
        $http.post(url + "/update", JSON.stringify($scope.room))
            .success(function (status) {
                console.log(status);
            })
            .error(function (error, status) {
                console.log(error.toString());
                console.log("Error occured");
            });
    };
});