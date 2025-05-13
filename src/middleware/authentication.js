
import { verifyToken } from "../utils/auth.js";

export function authenticate(req, res, next) {
    // obter o token do header authorization
    const authHeader = req.headers['authorization']
    

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            mensagem: "token de acesso não funciona!"
        })
    }

    try {
        //verificar se o token e valido
        // adicionar os dados decofificado do token na requisição

        const decoded = verifyToken(token)
        return res.json({
            mensagem: decoded
        })
        
        req.user = decoded
        next()

    } catch (error) {
        res.status(403).json({
            mensagem: "Token invalido ou expirado"
        })
    }
}