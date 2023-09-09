const express = require('express');
const router = express.Router();
const Order = require ('../models/Order');

router.post('/orderData', async (req,res) =>{
    let data = req.body.order_data   // order_data front end sy behja hy
    await data.splice(0,0,{ Order_date : req.body.order_date})   // add date to data

    //  if email not existing in db then create : else : insertmany()
    let eId = await Order.findOne({'email' : req.body.email})
    console.log(eId);

    if (eId === null) {
        try {
            await Order.create({
                email : req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success : true })
            })
        } catch (error) {
            console.log(error);
            res.send("error in order data backend",error.message)
        }
        
    }
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                {$push :{order_data:data}}).then(()=>{
                    res.json({success : true})
                })
            
        } catch (error) {
            res.send("error in order data backend",error.message)
        }

    }
})

router.post('/myorderData', async (req,res) =>{

    try {
        let myData = await Order.findOne({'email': req.body.email}) // front end sy email aey gi jb ham myorder pr click kry gy backend pr email aey gi jiss sy ham is eamil ka data show krwaey gy
        res.json({orderData : myData})
    } catch (error) {
        res.send(" error in my order data",error.message)

    }

})







module.exports = router;