require('dotenv').config();

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express();


let userRouter = require('./routes/userRoutes')
let urlRouter = require('./routes/urlRoutes')


const dbURI = process.env.DATABASE
mongoose.connect(dbURI,{useNewUrlParser:true ,useUnifiedTopology: true })
.then((result)=>{
    app.listen(process.env.SERVER_PORT,()=>{
        console.log(`Server listening on port ${process.env.SERVER_PORT}`)
    })
    console.log('connect to DB')
})
.catch((err)=>console.log(err))

app.use(express.json())
app.use(cors())
app.use(userRouter);
app.use(urlRouter);


