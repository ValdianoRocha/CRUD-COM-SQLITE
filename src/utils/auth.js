// bcrypt

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10
// para esconder um valor de uma variavel
const JWT_SECRET = process.env.JWT_SECRET

export async function hashPassword(password) {

    return await bcrypt.hash(password, SALT_ROUNDS)

}

export function genereteToken(user) {

    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET, 
        {expiresIn: "1h"}
    )
}