const express = require('express')
const router = express.Router()

const create_one = require('./controllers/create_one')
const update_one = require('./controllers/update_one')
const delete_one = require('./controllers/delete_one')
const get_one = require('./controllers/get_one')
const get_list = require('./controllers/get_list')
const get_list_by_question = require('./controllers/get_list_by_question')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')





router.post('/', create_one)

router.delete('/:id', delete_one)

router.get('/', get_list)

router.get('/question/:question_id', get_list_by_question)

router.get('/:id', get_one)

router.put('/:id', update_one)


module.exports = router