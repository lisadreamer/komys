console.log("productcontr js");
app.controller('ProductController',
    [
        '$scope',
        'products',
        '$routeParams',
        
        
        function ($scope, products, $routeParams) {
            products.success(
                function (data) {
                    $scope.detail = data[$routeParams.id];
                }
            );
        }
    ]
);