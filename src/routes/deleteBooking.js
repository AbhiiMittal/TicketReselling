const express = require('express')
const app = express()

app.use(express.json())



app.delete('/CancelMyBooking/:id',(req,res)=>{
    for(let i=0;i<totalBooking.length;i++){
        const element = totalBooking[i];
        if(element.id==req.params.id){
            totalBooking.splice(i,1)
            res.send("Booking canceled....")
            return
        }
    }
    res.json({
        "msg" : "failed"
    })
})

module.exports(app);