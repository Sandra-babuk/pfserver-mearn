// used to load content of .env file into process .env
require( 'dotenv').config()
const express = require( 'express')
const cors = require( 'cors')
const router = require('./routes/router')
require("./dbConnections/connection")

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploades',express.static('./uploades'))

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`PFServer started at port: ${PORT} and waiting for client request!!!`);
    
})
// resolving client/browser request(GET/PUT/POST/DELETE)using express
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">PFServer started and waiting for client request!!! </h1>`)
})

// pfServer.post('/',(req,res)=>{
//     res.status(200).send(`Post request received`)
// })

// pfServer.delete('/',(req,res)=>{
//     res.status(200).send(`request delete`)
// })

// pfServer.put('/',(req,res)=>{
//     res.status(200).send(`request delete`)
// })


