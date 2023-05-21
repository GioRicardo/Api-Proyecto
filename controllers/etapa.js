const Etapa = require('../models/etapa')
const {request, response} = require('express')


//Creación

const createEtapa = async (req = request,
    res = response) => {
    try{

        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const etapaBD = await Etapa.findOne({nombre})
        if(etapaBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const etapa = new Etapa(data)
        //console.log(etapa)
        await etapa.save()
        return res.status(201).json(etapa)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de etapa

const updateEtapa = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const etapaBD = await Etapa.findByIdAndUpdate(id,data, {new: true})

        if(!etapaBD) return res.json({msg: 'No hay datos'})
        
        return res.json({etapaBD})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getEtapas = async (req = request,
    res = response,next) => {
    try{
        if(req.query.estado) return next();

        const etapasBD = await Etapa.find({})
        if(etapasBD.length == 0 )
        return res.json({msg: 'No hay datos'})
        //select * from etapa where estado = ?;
        return res.json({etapasBD})
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}

module.exports = {createEtapa, getEtapas, updateEtapa }
