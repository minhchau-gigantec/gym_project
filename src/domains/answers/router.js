const express = require('express')
const router = express.Router()

const create_or_update = require('./controllers/create_or_update')
const delete_one = require('./controllers/delete_one')
const get_one = require('./controllers/get_one')
const get_list = require('./controllers/get_list')
const get_list_by_question = require('./controllers/get_list_by_question')

router.post('/', create_or_update)

router.delete('/', delete_one)

router.get('/', get_list)

router.get('/question/:question_id', get_list_by_question)

router.get('/:id', get_one)


module.exports = router