const express = require('express')
const router = express.Router();
const controller = require('../controller/urlController')
const authorizationController = require('../controller/authorizationController')

router.post('/shorten', authorizationController , controller.shortUrl)
router.get('/urls', authorizationController , controller.getUrls)
router.delete('/delete/:id', controller.deleteUrl)
router.get('/:url', controller.visitUrl)
module.exports = router