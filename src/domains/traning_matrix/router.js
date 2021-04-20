const express = require('express')
const router = express.Router()

const create_one = require('./controllers/create_one')
const delete_one = require('./controllers/delete_one')
const get_one_by_program = require('./controllers/get_one_by_program')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')

const check_permission = require('../../middleware/check_permission')
const {ADMIN_ROLE} = require('../../constants/constants')

router.post('/', validate(dataExample.create), check_permission([ADMIN_ROLE]), create_one)

router.delete('/:id', check_permission([ADMIN_ROLE]), delete_one)

//get by name or id of program
router.get('/program/:program_id', get_one_by_program)

module.exports = router