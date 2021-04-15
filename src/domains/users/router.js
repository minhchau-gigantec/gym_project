const express = require('express')
const router = express.Router()

const get_one = require('./controllers/get_one')
const update_one = require('./controllers/update_one')

const validate = require('../../middleware/check_validate')
const dataExample = require('./models/validate')


router.get('/:id', get_one)

router.put('/:id', validate(dataExample.update), update_one)

module.exports = router