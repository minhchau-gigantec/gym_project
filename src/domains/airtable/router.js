const express = require('express')
const router = express.Router()

const member_benefit = require('./controllers/member_benefit')
const pricing = require('./controllers/pricing')


router.post('/pricing', pricing)

router.post('/members-benefits', member_benefit)

module.exports = router