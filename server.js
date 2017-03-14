var express = require('express'); 
var app = express(); 
var fs = require("fs");

const port = process.env.PORT || 3000;

var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to support JSON-encoded bodies 
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var jsonfile = require('jsonfile');

app.use(function (req, res, next) {
    "use strict";
    // https://www.w3.org/TR/cors/#access-control-allow-origin-response-header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// At the bottom of this file is the server starting function!!!

// 0 0 0 0 0 0 0 0 0 TEST
app.get('/hello', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello World from Node.js Back-end");
});

// LIST PRODUCTS

app.get('/listProducts', function (req, res) {
    fs.readFile(__dirname + "/" + "products.json", 'utf8', function (err, data) {
       // console.log(data);
        res.end(data);
    });
})

// GET TYPE

app.get('/port/types', function (req, res){
    "use strict";
    var returnValue;
    var index;
    var found = false;
    var array = [];
    var typeArray = [];

    var filePath = __dirname + "/" + "products.json";
    jsonfile.readFile(filePath, function ( err, obj ) {
          array = obj;
          for (index = 0; index < array.length; index = index + 1) {
            if(typeArray.length > 0){
              if(contains(typeArray, array[index].type) == false){
                typeArray.push(array[index].type);
              }
            }
            else {
              typeArray.push(array[index].type);
            }
          }
          console.log("some comment" + typeArray);
          return typeArray;
         }
     );
     console.log(typeArray);
})


// FIND

app.get('/port/find', function (req, res) {
    fs.readFile(__dirname + "/" + "find.htm", 'utf8', function (err, data) {
        res.end(data);
    });
})

// INDEX

app.get('/index', function (req, res) {
    
          
      res.redirect("http://myy.haaga-helia.fi/~a1504523/WebShopKomys_/index.html", 'utf8', function (err, data) {
      res.end(data);
    });
    /*fs.readFile(__dirname + "/" + "index.html", 'utf8',function(err, data) {
        res.end(data);
    });*/
})

// FIND PRODUCT
 
app.post('/port/findProduct', function (req, res) {
    var name = req.body.name;
    console.log("Find/Search using this name: " + name); // ZZZZZ
    "use strict";
    var returnValue;
    var index;
    var found = false;
    var array = [];
    var filePath = __dirname + "/" + "products.json";
    console.log(filePath);
    if (!name || name.length===0) {
        returnValue = { "HttpStatusCode": "400", "Message": "Name cannot be empty!" };
        res.writeHead(Number(returnValue.HttpStatusCode), { 'Content-Type': 'text/plain' });
        res.end(returnValue.Message.toString());
    } else {
        jsonfile.readFile(filePath, function (err, obj) {
            array = obj;
            //console.dir(array);
            for (index = 0; index < array.length; index = index + 1) {
                console.log("Array index: " + index);
                if (array[index].name == name) {
                    found = true;
                    returnValue = {
                        "HttpStatusCode": "200",
                        "Message": "Ok, see Data",
                        "Data": {
					"id": array[index].id,
					"name": name,
					"img": array[index].img,
					"type": array[index].type,
					"material": array[index].material,
					"weight": array[index].weight,

					"description": array[index].description,
					"price": array[index].price
    }
                    };
                    break;
                }
            }

            if (found) {
                res.writeHead(Number(returnValue.HttpStatusCode), { 'Content-Type': 'text/plain' });
                res.end(JSON.stringify(returnValue.Data));
            } else {
                returnValue = { "HttpStatusCode": "404", "Message": "Name " + name + " not found!" };

                res.writeHead(Number(returnValue.HttpStatusCode), { 'Content-Type': 'text/plain' });
                res.end(returnValue.HttpStatusCode + " " + returnValue.Message.toString());
           }
        });
    }
});

// CONTAINS FUNCTIONS

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

var server = app.listen(port, function () {
    "use strict";
    var host = server.address().address;
    var port = server.address().port;

    //console.log("Example app listening at http://%s:%s", host, port);
    console.log("Example app listening at http://localhost:"+ port);
});

