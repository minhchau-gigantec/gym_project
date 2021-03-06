const express = require('express')
const router = express.Router()


const create_one = require('./controllers/create_one')
const get_list = require('./controllers/get_list')
const delete_one = require('./controllers/delete_one')
const get_one = require('./controllers/get_one')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')

const check_permission = require('../../middleware/check_permission')
const {ADMIN_ROLE} = require('../../constants/constants')

router.post('/', validate(dataExample.create), check_permission([ADMIN_ROLE]), create_one)

router.get('/', get_list)

router.delete('/:id', check_permission([ADMIN_ROLE]), delete_one)

//id: name or id of training program
router.get('/:id', get_one)



module.exports = router