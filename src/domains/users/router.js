const express = require('express')
const router = express.Router()

const create_one = require('./controllers/create_one')
const get_one = require('./controllers/get_one')
const update_one = require('./controllers/update_one')

router.post('/', create_one)

router.get('/:id', get_one)

router.put('/:id', update_one)

return router