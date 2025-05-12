// serve para organizar as funçoes especificas para serem usadas nas rotas 

import { PrismaClient } from '@prisma/client';
import { genereteToken, hashPassword } from '../utils/auth.js';
// import { skip } from '@prisma/client/runtime/library';

const prisma = new PrismaClient()

// mostrar todos os usuarios 
export const getAllUsers = async (req, res) => {
    try {
        const usuarios =  await prisma.user.findMany({
            omit: {
              password: true,
            },
          }); // busca todas as informaçoes do baco de dado
        res.status(200).json(usuarios)
    }
    catch (error) {
        res.status(500).send("erro no servidor")
    }
}

// criar novo usuario usando o pisma e nqlite
export const postUsers = async (req, res) => {
    try {
        const { name, password, email } = req.body
        const newUser = await prisma.user.create({ //cria um novo usuario usando as informaçoes do body e no molde pre definido 
            data: { name, password, email } //data -> são as novas informaçoes que sera atualizadas 
        })

        res.status(201).send(`Usuario: ${name} do Email: ${email}, foi criado!`)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO CRIAR NOVO USUARIO(controller)',
            erro: error.message
        })
    }
}

// deleta usuario 
export const deleteUser = async (req, res) => {
    try {
        const id = req.body
        const deletado = await prisma.user.delete({ //deleta um usuario que o id seja igual ao id informado 
            where: id // id usado para indetificar no banco de dados o que vai ser deletado
        })

        res.status(201).json(deletado)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO DELETAR USUARIO',
            erro: error.message
        })
    }
}

//delete usuario pelo URL
export const deleteUserUrl = async (req, res) => {
    try {
        const id = req.params.id
        const deletado = await prisma.user.delete({ //deleta um usuario que o id seja igual ao id informado 
            where: { id: Number(id) } // id usado para indetificar no banco de dados o que vai ser deletado
        })

        res.status(201).json(deletado)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO DELETAR USUARIO',
            erro: error.message
        })
    }
}

//atualiza usuario pegando o id do URL e do body as alteraçoes 
export const putUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, email, password } = req.body
        const put = await prisma.user.update({ //atualiza informaçoes do banco de dados pegando um parametro como id de procura 
            omit: {
                password: true
            },
            where: { // parametro de procura 
                id
            },
            data: { // valor a ser atualizado 
                name, email, password
            }
        })
        res.status(200).json(put)

    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO ATUALIZAR USUARIO',
            erro: error.message
        })
    }
}

//localiza e mostra na tela um usuario especifico pelo URL
export const getIdUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const encontrado = await prisma.user.findUnique({ // localiza e tras do banco a informação que o id seja igual ao id informado 
            where: { id } // parametro de procura 
        })
        if (!encontrado) {
            res.status(200).send("ID não existe!")
        }

        res.status(200).json(encontrado)

    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO ENCONTRAR USUARIO',
            erro: error.message
        })
    }
}

// filtrar por nome
export const UserFiltrar = async (req, res) => {
    try {
        const name = req.params.name
        const filtradas = await prisma.user.findMany({
            where: { name }
        })
        res.status(200).json(filtradas)

    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO ENCONTRAR USUARIO',
            erro: error.message
        })
    }
}

// filtro: comtem no nome
export const filterLetra = async (req, res) => {
    try {
        const letra = req.body.letra
        // console.log(letra);

        const localizada = await prisma.user.findMany({
            where: {
                name: {
                    startsWith: letra,
                },
            },
        });
        res.status(200).json(localizada)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO ENCONTRAR USUARIO',
            erro: error.message
        })
    }
}

// DELETAR TUDO
export const deleteTudo = async (req, res) => {
    const deletados = await prisma.user.deleteMany()
    res.status(200).send("TUDO APAGADO")
}

// localizar que contenha palavra especifica 
export const getContem = async (req, res) => {
    const contem = req.body.contem
    const encontrado = await prisma.user.findMany({
        where: {
            name: {
                contains: contem,
            },
        },
    })
    res.status(200).send(encontrado)
}

// buscar todos os usuarios entre o valor min e max.
export const idMinMax = async (req, res) => {
    const min = parseInt(req.body.min)
    const max = parseInt(req.body.max)
    const maxMin = await prisma.user.findMany({
        where: {
            id: {
                gte: min,
                lte: max,
            },
        },
    });

    res.send(maxMin);

}

// registrar novo usuario
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        //criar a senha do usuario hasheada(cryptografada)
        const hashedPassword = await hashPassword(password)

        //cria usuario no banco de dados 
        const newRegistrodUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        // gerar um token
        const token = genereteToken(newRegistrodUser)
        res.status(201).json({
            name: newRegistrodUser.name,
            email: newRegistrodUser.email,
            token: token
        })
    } catch (error) {
        res.status(400).json({
            erro: "Erro ao criar usuario",
            detalhes: error.message
        })
    }
}

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body
//     const checkEmail = await prisma.user.findUnique({
//         where: {
//             email: email
//         }
//     })
//     if (!checkEmail) {
//         return res.status(400).json({
//             mensagem: "Email ou Senha esta errada"
//         })
//     }
// const authPassword = await 

// }