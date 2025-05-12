//organizar os roteadores, nessa caso o router de user

import express, { Router } from 'express'
import { deleteTudo, deleteUser, deleteUserUrl, filterLetra, getAllUsers, getContem, getIdUser, idMinMax, loginUser, postUsers, putUser, registerUser, UserFiltrar } from '../controllers/userController.js'

const router = express.Router()

router.get("/", getAllUsers)

router.post("/", postUsers)

router.delete("/", deleteUser)

router.delete("/:id", deleteUserUrl)

router.put("/:id", putUser)

router.get("/:id", getIdUser)

router.get("/filter/:name", UserFiltrar)

router.get("/filter/letra/letra", filterLetra)

router.delete("/tudo/tudo", deleteTudo)

router.get('/contem/contem/', getContem)

router.get('/filter/MinMax/idMinimo/idMaximo/', idMinMax)

router.post('/register', registerUser)

// router.get('/loginUser/loginUser', loginUser)

export default router