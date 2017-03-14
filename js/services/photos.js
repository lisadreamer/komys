console.log("services js");

app.factory('products',
    [
        '$http',
        function ($http) {console.log("homecontr js function");
            return $http.get('http://localhost:5000/listProducts')
            .success(
                function (data) {
                    return data;
                }
            ).error(
                function (data) {
                    return data;
                }
            );
        }
    ]
);
