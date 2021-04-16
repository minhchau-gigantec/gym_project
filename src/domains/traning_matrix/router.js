const express = require('express')
const router = express.Router()

const create_one = require('./controllers/create_one')
const delete_one = require('./controllers/delete_one')
const get_one_by_program = require('./controllers/get_one_by_program')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')

router.post('/', validate(dataExample.create), create_one)

router.delete('/:id', delete_one)

//get by name or id of program
router.get('/program/:program_id', get_one_by_program)

module.exports = router