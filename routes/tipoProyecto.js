const { Router } = require('express')

const { createTipoProyecto, updateTipoProyecto, getTipoProyectos} = require('../controllers/tipoProyecto')


const router = Router()


// crear
router.post('/', createTipoProyecto)

// editar EstadoEquipo
router.put('/', updateTipoProyecto)

// listar
router.get('/', getTipoProyectos)

module.exports = router
