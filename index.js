const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(cors())

arr=[];
let BookingId = Math.floor(Math.random()*1000000)+1;
let totalBooking = []
app.post('/makeBooking',(req,res)=>{
    const booking = {
        id : BookingId,
        Name : req.body.name,
        people : req.body.people,
        contact : req.body.contact,
    }
    BookingId = Math.floor(Math.random()*1000000)+1;
    totalBooking.push(booking);
    res.status(201).json(booking)
})

app.get('/getMyBooking/:id',(req,res)=>{
    for(let i=0;i<totalBooking.length;i++){
        const element = totalBooking[i];
        if(element.id==req.params.id){
            res.json(element)
            return;
        }
    }
    res.json({
        "Error" : "No Booking found"
    })
})

app.get('/getAllBookings',(req,res)=>{
    res.json(totalBooking)
})
app.post('/transferMyBooking/:id',(req,res)=>{
    let transferId=0; let maxTransfer =0;
    let notTransfer = 0;
    for(let i=0;i<totalBooking.length;i++){
        const element = totalBooking[i];
        if(element.id==req.params.id){
            notTransfer = element
            transferId = element.id;
            maxTransfer = element.people;
            totalBooking.splice(i,1)
            return
        }
    }
        const transfer = {
            id : transferId,
            Name : req.body.name,
            people : req.body.people,
            contact : req.body.contact
        }
        if(transfer.people>maxTransfer){
            res.json({
                "msg" : "Can't transfer"
            })
            totalBooking.push(notTransfer);
        }else{
            totalBooking.push(transfer);
        }
        res.status(201);
})

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

app.listen(port,()=>{
    console.log(`server started at ${port}`)
})