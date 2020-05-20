const express =  require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling Get Request to /Products"
    })
})

router.post('/',(req,res,next)=>{
    console.log("inisde User",req.body)

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        lastName:req.body.lastName
    })
    
    user.save().then(result =>{
        console.log("result",result);
        res.status(201).json({
            message:"Handling Post Request to /Users",
            createUser: user
        })
    })
    .catch(error=>console.log(error));

    
})

router.get('/:userId',(req,res,next)=>{
    console.log("Id", req.params.userId)
    const id = req.params.userId;
    // User.findById(id)
    // .exec()
    // .then(doc=>{
    //     console.log(doc);
    //     res.status(200).json(doc);
    // })
    // .catch(error=>{
    //     console.log("error");
    //     res.status(500).json({
    //         error:error+"whatsapp"
    //     })
    // });

    User.findById(id, function (err, post) {
        if (!err) {
        //   post.comments[0].remove();
        //   post.save(function (err) {
        //     // do something
        //   });
        console.log("ID inside findby id")
        }
      });

})

router.patch('/:productId',(req,res,next)=>{
    const  id = req.params.productId;
    
    res.status(200).json({
        message:"Updated Product"
    })

})

router.delete('/:productId',(req,res,next)=>{
    const  id = req.params.productId;
    
    res.status(200).json({
        message:"Deleted Product"
    })

})

module.exports = router;