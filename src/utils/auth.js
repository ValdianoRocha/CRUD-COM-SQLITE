// bcrypt

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10
// para esconder um valor de uma variavel
const JWT_SECRET = process.env.JWT_SECRET

// cria uma senha criptografada
export async function hashPassword(password) {

    return await bcrypt.hash(password, SALT_ROUNDS)

}

//gera o token
export function genereteToken(user) {

    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    )
}

//verifica se a senha do usuario é a mesma do db
export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

//verifica se o token é valido 
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}