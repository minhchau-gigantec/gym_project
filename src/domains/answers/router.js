const express = require('express')
const router = express.Router()

const create_one = require('./controllers/create_one')
const update_one = require('./controllers/update_one')
const delete_one = require('./controllers/delete_one')
const get_one = require('./controllers/get_one')
const get_list = require('./controllers/get_list')
const get_list_by_question = require('./controllers/get_list_by_question')

const submit_answer = require('./controllers/submit_answer')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')
const { validateFunctionCode } = require('ajv/dist/compile/validate')


router.post('/', validate(dataExample.create), create_one)

router.post('/submit', validate(dataExample.ids), submit_answer)

router.delete('/:id', delete_one)

//Nhớ bỏ validate vào lại
router.get('/list', get_list)

router.get('/question/:question_id', get_list_by_question)

router.get('/:id', get_one)

router.put('/:id', validate(dataExample.update), update_one)


module.exports = router