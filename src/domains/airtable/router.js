const express = require('express')
const router = express.Router()

const create_information = require('./controllers/create_infomation')
const create_user_info = require('./controllers/create_user_info')


router.post('/user_info', create_user_info)

router.post('/information', create_information)

module.exports = router