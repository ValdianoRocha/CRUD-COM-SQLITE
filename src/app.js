//usar o express e configurar

import express from 'express'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())

app.use("/usuarios", userRoutes);

export default app