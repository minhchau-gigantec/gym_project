const express = require('express')
const router = express.Router()

const create_or_update = require('./controllers/create_or_update')
const delete_one = require('./controllers/delete_one')
const get_list = require('./controllers/get_list')
const get_one = require('./controllers/get_one')

router.post('/', create_or_update)

router.get('/', get_list)

router.delete('/:id', delete_one)

router.get('/:id', get_one)


module.exports = router