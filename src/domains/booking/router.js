const express = require('express')
const router = express.Router()

const create_one = require('./controllers/create_one')
const get_list = require('./controllers/get_list')
const get_list_by_user = require('./controllers/get_list_by_user')
const get_one = require('./controllers/get_one')
const update_one = require('./controllers/update_one')
const delete_one = require('./controllers/delete_one')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')


router.post('/', validate(dataExample.create), create_one)

router.get('/', get_list)

router.get('/user', get_list_by_user)

router.get('/:id', get_one)

router.put('/:id', validate(dataExample.update), update_one)

router.delete('/:id', delete_one)


module.exports = router