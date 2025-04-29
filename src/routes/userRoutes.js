//organizar os roteadores, nessa caso o router de user

import express from 'express'
import {getAllUsers, postUsers} from '../controllers/userController.js'

const router = express.Router()

// router.get("/",(req,res)=>{
//     res.status(200).json(usuario)
// })

router.get("/", getAllUsers)

router.post("/criar",  postUsers)

export default router