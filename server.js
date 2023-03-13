const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const{conn,Character,seed} = require('./db')
const path = require('path')

app.use(express.json())
app.use('/dist',express.static('dist'))
app.use('/assets',express.static('assets'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/api/characters',async(req,res,next)=>{
    try{
        res.send(await Character.findAll())
    }
    catch(ex){
        next(ex)
    }
})
app.post('/api/characters',async(req,res,next)=>{
    try{
        const character = await Character.create(req.body)
        res.status(201).send(character)
    }
    catch(ex){
        next(ex)
    }
})
app.delete('/api/characters/:id',async(req,res,next)=>{
    try{
        const character = await Character.findByPk(req.params.id)
        await character.destroy()
        res.sendStatus(204)
    }
    catch(ex){
        next(ex)
    }
})
app.put('/api/characters/:id',async(req,res,next)=>{
    try{
        const character = await Character.findByPk(req.params.id)
        await character.update(req.body)
        res.send(character)
    }
    catch(ex){
        next(ex)
    }
})
app.use((err,req,res,next) => {
    console.log(err)
    res.send({error:err})
})

app.listen(port,async()=>{
    try{
        await seed()
        console.log(`listening on port ${port}`)
    }
    catch(ex){
        console.log(ex)
    }
})