// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import {app} from "./app.js"

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";


dotenv.config({
    path: './.env'
})

connectDB()

.then(() => {
    app.on("error", (error) => {
                    console.log("ERRR: ", error );
                    throw error
                })


    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB CONNECTION failed !!!",err);
})













// import express from "express";
// const app = express()
// // ifee   isse arrow function bann gya its a better approach
// // and ek semicolon laga dena is a good practice
// ( async () => {
//     try{
//         await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')

//         app.on("error", (error) => {
//             console.log("ERRR: ", error );
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log('App is listening on port ${process.env.PORT}');
//         })
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()