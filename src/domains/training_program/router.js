const express = require('express')
const router = express.Router()


const create_one = require('./controllers/create_one')
const get_list = require('./controllers/get_list')
const delete_one = require('./controllers/delete_one')

router.post('/', create_one)

router.get('/', get_list)

router.delete('/:id', delete_one)

module.exports = router