const { Router } = require('express')

const { createUniversidad, updateUniversidad, getUniversidades} = require('../controllers/universidad')



const router = Router()


// crear
router.post('/', createUniversidad)

// editar Marca
router.put('/', updateUniversidad)

// listar
router.get('/', getUniversidades)

module.exports = router
