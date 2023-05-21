const { Router } = require('express')
const { createEtapa, getEtapas,updateEtapa } = require('../controllers/etapa')


const router = Router()


// crear
router.post('/', createEtapa)

// editar tipoEquipo
router.put('/', updateEtapa)

// listar
router.get('/', getEtapas)

module.exports = router
