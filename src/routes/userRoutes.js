//organizar os roteadores, nessa caso o router de user

import express, { Router } from 'express'
import { deleteTudo, deleteUser, deleteUserUrl, filterLetra, getAllUsers, getContem, getIdUser, idMinMax, postUsers, putUser, UserFiltrar } from '../controllers/userController.js'
import { validate } from '../middleware/validate.js'
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas.js'

const router = express.Router()

router.get("/", getAllUsers)

router.post("/", validate(createUserSchema), postUsers)

router.delete("/", deleteUser)

router.delete("/:id", deleteUserUrl)

router.put("/:id",validate(updateUserSchema), putUser)

router.get("/:id", getIdUser)

router.get("/filter/:name", UserFiltrar)

router.get("/filter/letra/letra", filterLetra)

router.delete("/tudo/tudo", deleteTudo)

router.get('/contem/contem/', getContem)

router.get('/filter/MinMax/idMinimo/idMaximo/', idMinMax)

export default router