// serve para remediar ou servir de vinculo com o zod

// requisição -> middleware -> rota(controller) -> resposta

/** middleware pode fazer 
 * function middleware(req, res, next){...}
 * 1. fazer algo com a requisição
 * -> validar as informaçoes
 * -> verificar se o usr tem conta
 * 2. modificar a resposta 
 * -> dar uma resposta ao cliente 
 * 3. chamar o next() para passar para o proximo middleware/controller
 * ou encerra com res.send()/json()
 */


export function validate(schema) {
    return (req, res, next) => {
        try {
            //validar o corpo da requisição contra o schema fornecido
            const validateDada = schema.parse(req.body)

            //substituir o body pelos dados validados 
            req.body = validateDada

            // chamar o proximo agente(middleware)
            next()
        } catch (error) {
            const message = error.issues.map(err => ({
                path: err.path[0],
                message: err.message}))
          return res.status(400).json({
            mensagem: "Erro de validação",
            error: message,
            // error: error

          })
        }
    }
}