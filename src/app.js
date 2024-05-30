import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

// backend kis ko access dega frontend me 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// routes import
import userRouter from './routes/user.routes.js'
import  healthRouter from "./routes/healthcheck.routes.js"
import playlistrouter from "./routes/playlist.routes.js"




// routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/condition",healthRouter)
app.use("/api/v1/list",playlistrouter)
// http://localhost:8000/api/v1/users/register

export { app }