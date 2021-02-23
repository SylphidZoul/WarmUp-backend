const express = require('express')

const router = express()

router.get('/', (req, res) => {
  res.send('hello word')
})

module.exports = router
