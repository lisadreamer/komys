// *** js/controllers/HomeController.js

console.log("homecontr js");
app.controller('HomeController',
    [
        '$scope',
        'products',
        
        
        
        function ($scope, products) {
            products.success(
                function (data) {
                    $scope.products = data;
                }
            );
            
            $scope.toggleActive = function(s){
                s.active = !s.active;
            };

            // Helper method for calculating the total price

            $scope.total = function(){

                var total = 0;

                // Use the angular forEach helper method to
                // loop through the services array:

                angular.forEach($scope.products, function(s){
                    if (s.active){
                        total+= s.price;
                    }
                });

                return total;
            };
            
            $scope.del = function(s){

                s.active = !s.active;
            };
        }
                        
    ]
);

app.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});


        
/* Same with standard JavaScript coding style

app.controller('HomeController', ['$scope', 'photos', function ($scope, photos) {
    photos.success(function (data) {
        $scope.products = data;
    });
}]);

*/