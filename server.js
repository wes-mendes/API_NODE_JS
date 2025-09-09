import express from 'express'
import cors from 'cors'

import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

//ROTAS

app.put('/cadastro/:id', async (req,res)=>{

    //console.log(req.params.id)
    await prisma.usuario.update({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email, 
            nome: req.body.nome,
            idade: req.body.idade
        }
    })

    res.status(201).json({"message":"Cliente atualizado!"})
})

app.delete('/cadastro/:id', async (req,res)=>{

    //console.log(req.params.id)
    await prisma.usuario.delete({
        where:{
            id: req.params.id
        }
    })


    res.status(201).json({"message":"Cliente apagado com sucesso."})
})


app.get('/cadastro',async(req,res)=>{

    const lista_usuarios =  await prisma.usuario.findMany()

    res.status(200).json(lista_usuarios)
})

app.post('/cadastro',async (req,res)=>{
   
    await prisma.usuario.create({
        data:{
            email: req.body.email, 
            nome: req.body.nome,
            idade: req.body.idade
        }
    })

    res.status(201).json(req.body)
})


//PORTA LOCAL DO SERVIDOR
app.listen(3000,()=>{
    console.log('SERVIDOR RODANDO.')
})