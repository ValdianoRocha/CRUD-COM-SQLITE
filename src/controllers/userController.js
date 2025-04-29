// serve para organizar as funçoes especificas para serem usadas nas rotas 

export const getAllUsers = (req,res)=>{
    res.status(200).json({
        mensagem: "Rota get user funcionando!!"
    })
}

export const postUsers = (req,res)=>{
    const {nome, email} = req.body
    res.status(201).send(`Usuario: ${nome} do Email: ${email}, foi criado!`)
}