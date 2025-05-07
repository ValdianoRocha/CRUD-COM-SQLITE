import express from 'express'
import { validate } from '../middleware/validate.js'
import { allProductId, creatProducts, deleteProductUrl, getAllProducts, updateProduct } from '../controllers/productController.js'
import { createProductSchem, updateProductSchem } from '../schemas/productSchemas.js'

const router = express.Router()

router.post("/products", validate(createProductSchem), creatProducts)

router.get("/products", getAllProducts)

router.get("/products/:id", allProductId)

router.put("/products/:id", validate(updateProductSchem), updateProduct)

router.delete("/products/:id", deleteProductUrl)

export default router