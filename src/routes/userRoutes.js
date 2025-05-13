//organizar os roteadores, nessa caso o router de user

import express, { Router } from 'express'
import { deleteTudo, deleteUser, deleteUserUrl, filterLetra, getAllUsers, getContem, getIdUser, idMinMax, logim, postUsers, putUser, registerUser, UserFiltrar } from '../controllers/userController.js'
import { validate } from '../middleware/validate.js'
import { createUserSchema, loginShema, updateUserSchema } from '../schemas/userSchemas.js'
import { authenticate } from '../middleware/authentication.js'

const router = express.Router()

router.get("/", authenticate, getAllUsers)

router.post("/", validate(createUserSchema), postUsers)

router.delete("/", deleteUser)

router.delete("/:id", deleteUserUrl)

router.put("/:id", validate(updateUserSchema), putUser)

router.get("/:id", getIdUser)

router.get("/filter/:name", UserFiltrar)

router.get("/filter/letra/letra", filterLetra)

router.delete("/tudo/tudo", deleteTudo)

router.get('/contem/contem/', getContem)

router.get('/filter/MinMax/idMinimo/idMaximo/', idMinMax)

router.post('/register', registerUser)

router.post('/loginUser/loginUser', validate(loginShema), logim)

export default router