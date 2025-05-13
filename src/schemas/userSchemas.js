// trabalhando com o zod

import { z } from 'zod'


export const createUserSchema = z.object({
    name: z.string().min(3).trim(),
    email: z.string().email(),
    password: z.string().min(6).trim().regex(/[A-Za-z0-9]/),
})


export const updateUserSchema = z.object({
    name: z.string().min(3).trim().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).trim().regex(/[A-Za-z0-9]/).optional(),
})

export const loginShema = z.object({
    email: z.string().email("Email ou Senha invalida!"),
    password: z.string().min(6, "senha ou email incorreto!")
})