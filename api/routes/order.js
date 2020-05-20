const express =  require("express");
const router = express.Router();


router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:"Handling Get Request to /Order"
    })
})

router.post('/',(req,res,next)=>{
    const order = {
        productID : req.body.productId,
        quantity : req.body.quantityId
    }
    res.status(201).json({
        message:"Orders were fetched"
    })
})

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"Orders Details",
        orderID: req.params.orderId
    })
})

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"Orders Deleted",
        orderID: req.params.orderId
    })
})

module.exports = router;