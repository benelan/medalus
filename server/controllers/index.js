const express = require('express')
    , router = express.Router()

router.get('/ping', (req, res) => {
    return res.send('pong')
})

router.use(require('./data'))


module.exports = router