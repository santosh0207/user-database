const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/**
 * Middleware app to passthrough this middle ware the next can be another middleware in the queue
 */
 console.log(process.env.MONGO_PW_ATLAS)

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://santosh:"+process.env.MONGO_PW_ATLAS+"@cluster0-bm3cr.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection)
//   // perform actions on the collection object
//   //client.close();
// });

const uri = "mongodb+srv://santosh:"+process.env.MONGO_PW_ATLAS+"@cluster0-bm3cr.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},()=>{
    console.log("tadatada")
}).then(()=>{
    
    
    
    console.log("connected")


    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended : false}));
    app.use(bodyParser.json());
    
    /**CORS ERROR AVOID */
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if(res.method ==="OPTIONS"){
            res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
            return res.status(200).json({});
        }
        next();
    })
        
    const userRoutes = require('./api/routes/User');
    const orderRoutes = require('./api/routes/order');

    app.use('/users', userRoutes);
    app.use('/orders', orderRoutes);

    app.use((req,res,next)=>{
        const error = new Error('Not Found');
        error.status(404);
        next(error);
    })

    app.use((error, req,res, next)=>{
        res.status(error.status || 500);
        res.json({
            error:{
                message:error.message
            }
        })
    })


});

module.exports = app;