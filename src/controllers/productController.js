
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const creatProducts = async (req, res) => {
    try {
        const {name, description,price, stock} = req.body

        const newProduct = await prisma.product.create({ 
            data: { name, description, price, stock } 
        })
        console.log(name, description, price, stock);
        
        res.status(201).send(`Produto: ${name} foi criado!`)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO CRIAR NOVO PRODUTO(controller)',
            erro: error.meta.cause
            
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products =  await prisma.product.findMany({});
        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).send("erro no servidor")
    }
}

export const allProductId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const encontrado = await prisma.product.findUnique({
            where: { id }
        })
        if (!encontrado) {
            res.status(200).send("ID não existe!")
        }

        res.status(200).json(encontrado)

    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO ENCONTRAR O PRODUTO',
            erro: error.meta.cause
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, description, price, stock } = req.body
        const put = await prisma.product.update({
            where: { 
                id
            },
            data: { 
                name, description, price, stock
            }
        })
        res.status(200).json(put)

    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO ATUALIZAR PRODUTO',
            erro: error.meta.cause
        })
    }
}

export const deleteProductUrl = async (req, res) => {
    try {
        const id = req.params.id
        const deletado = await prisma.product.delete({ 
            where: { id: Number(id) } 
        })

        res.status(201).json(deletado)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO DELETAR PRODUTO',
            erro: error.meta.cause
        })
    }
}

