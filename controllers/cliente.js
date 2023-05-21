const Cliente = require('../models/cliente')
const {request, response} = require('express')


//Creación

const createCliente = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''

        const email = req.body.email

        const clienteBD = await Cliente.findOne({nombre})
        if(clienteBD){
            return res.status(400).json({msg: 'Ya existe'})
        }

        const data = {
            nombre,
            email
        }

        const cliente = new Cliente(data)

        await cliente.save()
        return res.status(201).json(cliente)

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de Usuario

const updateCliente = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const cliente = await Cliente.findByIdAndUpdate(id,data, {new: true})

        if(!cliente) return res.json({msg: 'No hay datos'})
        
        return res.json({cliente})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getClientes = async (req = request,
    res = response, /*next*/) => {
    try{
        // if(req.query.estado) return next();

        const clientesDB = await Cliente.find({})
        if(clientesDB.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json({clientesDB})
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {createCliente, getClientes, updateCliente}
