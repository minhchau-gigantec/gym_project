const express = require('express')
const router = express.Router()


const create_one = require('./controllers/create_one')
const get_list = require('./controllers/get_list')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')

router.post('/', validate(dataExample.create), create_one)

router.get('/', get_list)

module.exports = router