var express = require('express'),
    app = express(),
    mongodb = require ('mongodb').MongoClient,
    bodyParser = require('body-parser');
    cors = require('cors');
    jsonwebtoken = require('jsonwebtoken');

const mongo_conn = 'mongodb://localhost/';
var db = '';

app.use(cors({
   origin: 'http://localhost:4200'
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


mongodb.connect(mongo_conn,function(err, client){
    if(!err){
        console.log('Connection Established!');
        app.listen(7979, function(){
            console.log("Server Started @ localhost:7979");
        });
        db = client.db('mydb');
    }else{
        console.log('Could not connect to MongoDB');
    }
    
});

app.post('/authenticate', function(req,resp){
    if(req.body.username == "admin" && req.body.password == "admin"){
        var token = jsonwebtoken.sign({username : req.body.username},'secret-key',{
            'expiresIn':'1h'
        });
        resp.send({
            token: token,
            isLoggedIn : true
        });
    }else{
        resp.send({
            isLoggedIn:false,
            err:'Invalid Credentials'
        });
    }
});

app.use(function(req,res,next){
    var token = req.body.authorization || req.query.authorization || req.headers.authorization;
    if(token){
        jsonwebtoken.verify(token,'secret-key',function(err,decoded){
            if(!err){
                console.log('authorized');
                req.decoded = decoded;
                next();
            }else{
                res.send({
                    isLoggedIn:false,
                    err:'Invalid Credentials'
                });
            }
        })
    }
    else{
        res.send({
            isLoggedIn:false,
            err:'Invalid Credentials'
        });
    }
});

app.get('/getdetails',function(req,res){
    var obj = JSON.parse(req.query.myobj);
    db.collection('products').find({productCode:obj.pId}).toArray(function(err,docs){
        console.log(docs);
        res.send({
            success:true,
            docs: docs
        });
    });
});

app.get('/getproducts', function(req,res){

    db.collection('products').find().toArray(function(err,docs){
        res.send({
            success:true,
            docs: docs
        });
    });

    // res.send([
    //     {
    //     "productId": 1,
    //     "productName": "Leaf Rake",
    //     "productCode": "GDN-0011",
    //     "releaseDate": "March 19, 2016",
    //     "description": "Leaf rake with 48-inch wooden handle.",
    //     "price": 19.95,
    //     "starRating": 3.2,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    //   },
    //   {
    //     "productId": 2,
    //     "productName": "Garden Cart",
    //     "productCode": "GDN-0023",
    //     "releaseDate": "March 18, 2016",
    //     "description": "15 gallon capacity rolling garden cart",
    //     "price": 32.99,
    //     "starRating": 4.2,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    //   },
    //   {
    //     "productId": 5,
    //     "productName": "Hammer",
    //     "productCode": "TBX-0048",
    //     "releaseDate": "May 21, 2016",
    //     "description": "Curved claw steel hammer",
    //     "price": 8.9,
    //     "starRating": 4.8,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    //   },
    //   {
    //     "productId": 8,
    //     "productName": "Saw",
    //     "productCode": "TBX-0022",
    //     "releaseDate": "May 15, 2016",
    //     "description": "15-inch steel blade hand saw",
    //     "price": 11.55,
    //     "starRating": 3.7,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    //   },
    //   {
    //     "productId": 10,
    //     "productName": "Video Game Controller",
    //     "productCode": "GMG-0042",
    //     "releaseDate": "October 15, 2015",
    //     "description": "Standard two-button video game controller",
    //     "price": 35.95,
    //     "starRating": 4.6,
    //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    //   }
    // ]);
});