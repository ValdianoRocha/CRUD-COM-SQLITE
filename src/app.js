//usar o express e configurar

import express from 'express'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRouter.js'

const app = express()

app.use(express.json())

app.use("/usuarios", userRoutes);

app.use("/products", productRoutes);

export default app

