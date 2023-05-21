const TipoProyecto = require('../models/tipoProyecto')
const {request, response} = require('express')


//Creación

const createTipoProyecto = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const tipoProyectoBD = await TipoProyecto.findOne({nombre})
        if(tipoProyectoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const tipoProyecto = new TipoProyecto(data)
        //console.log(EstadoEquipo)
        await tipoProyecto.save()
        return res.status(201).json(tipoProyecto)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de estadoequipo

const updateTipoProyecto = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const tipoProyectoBD = await TipoProyecto.findByIdAndUpdate(id,data, {new: true})

        if(!tipoProyectoBD) return res.json({msg: 'No hay datos'})
        
        return res.json({tipoProyectoBD})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getTipoProyectos = async (req = request,
    res = response,next) => {
    try{
        if(req.query.estado) return next();

        const tipoProyectosBD = await TipoProyecto.find({})
        if(tipoProyectosBD.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json({tipoProyectosBD})
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {createTipoProyecto, getTipoProyectos, updateTipoProyecto, }
