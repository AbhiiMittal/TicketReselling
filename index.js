const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(cors())

arr=[];
let BookingId = Math.floor(Math.random()*1000000)+1;
let totalBooking = []
let blacklisted = []
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

app.post('/reportPerson/:id',(req,res)=>{
    for(let i=0;i<totalBooking.length;i++){
        const ele  = totalBooking[i];
        if(ele.id==req.params.id){
            blacklisted.push(ele)
        }
    }
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

// app.get('/getAllBookings',(req,res)=>{
//     res.json(totalBooking)
// })
app.post('/transferMyBooking/:id', (req, res) => {
    let transferId = 0;
    let maxTransfer = 0;
    let notTransfer = null; 

    for (let i = 0; i < totalBooking.length; i++) {
        const element = totalBooking[i];
        if (element.id == req.params.id) {
            notTransfer = element;
            transferId = element.id;
            maxTransfer = element.people;
            totalBooking.splice(i, 1);
            break;
        }
    }

    if (notTransfer === null) {
        res.status(404).json({ "msg": "Booking not found" });
        return;
    }

    const transfer = {
        id: transferId,
        Name: req.body.name,
        people: req.body.people,
        contact: req.body.contact
    };

    if (transfer.people > maxTransfer) {
        res.status(400).json({ "msg": "Can't transfer" });
        totalBooking.push(notTransfer);
    } else if(transfer.people < maxTransfer){
        totalBooking.push(transfer);
        notTransfer.people = maxTransfer-transfer.people
        totalBooking.push(notTransfer);
    }else{
        totalBooking.push(transfer);
    }

    res.status(201).json({ "msg": "Transfer successful", "booking": transfer });
});

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