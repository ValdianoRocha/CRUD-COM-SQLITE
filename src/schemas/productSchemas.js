
import {z} from 'zod'


export const createProductSchem = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().positive()
})

export const updateProductSchem = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().positive().optional()
})
