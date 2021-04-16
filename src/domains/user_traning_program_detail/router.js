const express = require('express')
const { update } = require('../answers/models/validate')
const router = express.Router()

const create_one = require('./controllers/create_one')
const delete_one = require('./controllers/delete_one')
const get_list_by_user = require('./controllers/get_list_by_user')
const get_one_by_user = require('./controllers/get_one_by_user')
const update_one = require('./controllers/update_one')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')

router.post('/', validate(dataExample.create), create_one)

router.get('/', get_list_by_user)

router.get('/:id', get_one_by_user)

router.delete('/:id', delete_one)

router.put('/:id', validate(dataExample.update), update_one)

module.exports = router