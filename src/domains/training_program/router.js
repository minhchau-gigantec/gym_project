const express = require('express')
const router = express.Router()


const create_one = require('./controllers/create_one')
const get_list = require('./controllers/get_list')

router.post('/', create_one)

router.get('/', get_list)

module.exports = router