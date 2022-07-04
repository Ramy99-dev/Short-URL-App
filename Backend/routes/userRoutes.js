const express = require('express')
const router = express.Router();
const controller = require('../controller/userController')

router.post('/add-user', controller.addUser)
router.put('/update-account', controller.validateAccount)
router.post('/login', controller.login)


module.exports = router