///////////////////////////////////////app.js

//hello *** js/app.js
console.log("appjs runs!!!!!!!!!!!");
var app = angular.module('GalleryApp', ['ngRoute']);

app.config(
    function ($routeProvider) {
        $routeProvider.when('/',
            {   
                controller: 'HomeController',
                templateUrl: 'views/home.html'
            }
        ).when('/products/:id',
            {
                controller: 'ProductController',
                templateUrl: 'views/product.html'
            }
        
        ).otherwise(
            {
                redirectTo: '/'
            }
        );
        
        
    }
);
