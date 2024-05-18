//console.log("hi");

const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const lead=require('./routes/lead.router');
const user=require("./routes/user")


const app=express();
app.use(cors())
app.use(express.json());


app.use('/api/lead',lead);
app.use('/api/user',user)






const PORT=5551;
mongoose.connect('mongodb+srv://pugazhenthi27s:TfjQz9CwlrbNiMBI@cluster0.wtpxspq.mongodb.net/sales?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>app.listen(PORT))
.then(()=>console.log(`connected mongoDB AND SERVER RUNNNNING ${PORT}`))
.catch((err)=>{
    console.log("err is",err);
});