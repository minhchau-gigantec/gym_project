const express = require('express')
const router = express.Router()

const create_one = require('./controllers/create_one')
const update_one = require('./controllers/update_one')
const delete_one = require('./controllers/delete_one')
const get_list = require('./controllers/get_list')
const get_one = require('./controllers/get_one')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')

const check_permission = require('../../middleware/check_permission')
const { ADMIN_ROLE } = require('../../constants/constants')

router.post('/', validate(dataExample.create), check_permission([ADMIN_ROLE]), create_one)

router.get('/', get_list)

router.delete('/:id', check_permission([ADMIN_ROLE]), delete_one)

router.get('/:id', get_one)

router.put('/:id', validate(dataExample.update), check_permission([ADMIN_ROLE]), update_one)


module.exports = router