/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('myContactApp', ['ngRoute']);

//Route Configurations
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/listView.html',
                    controller: 'ListController'
                })
                .when('/contact/:contact_index', {
                    templateUrl: 'partials/viewContact.html',
                    controller: 'ContactController'
                })
                .when('/addContact/', {
                    templateUrl: 'partials/addContact.html',
                    controller: 'AddContactController'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);

app.service('Contact', function($http) {
    return {
        addContactByVal: function(object) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            return $http.post("server/add.php", object);
        }
    };
});

app.controller('ListController', ['$scope', '$http', function($scope, $http) {
        $http.get('resources/json/dummy.json').success(function(data) {
            $scope.contacts = data;
            $scope.contactOrder = 'name';

        });
    }]);
app.controller('ContactController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {


        $http.get('resources/json/dummy.json').success(function(data) {

            $scope.contacts = data;
            $scope.contactIndex = $routeParams.contact_index;
            if ($routeParams.contact_index > 0) {
                $scope.prevItem = Number($routeParams.contact_index) - 1;
            } else {
                $scope.prevItem = $scope.contacts.length - 1;
            }

            if ($routeParams.contact_index < $scope.contacts.length - 1) {
                $scope.nextItem = Number($routeParams.itemId) + 1;
            } else {
                $scope.nextItem = 0;
            }
        });
    }]);
app.controller('AddContactController', function($scope, Contact, $http, $routeParams, $window) {

    $scope.addContact = function() {
        var object = $.param({name: $scope.contact.name, email: $scope.contact.email, phone_no: $scope.contact.phone_no});
        Contact.addContactByVal(object).then(function(data) {
            $window.location.href = "#";
        });
    };
});
