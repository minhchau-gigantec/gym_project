const express = require('express')
const router = express.Router()


const create_one = require('./controllers/create_one')
const delete_one = require('./controllers/delete_one')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')

router.post('/', validate(dataExample.create), create_one)

router.delete('/:id', delete_one)



module.exports = router