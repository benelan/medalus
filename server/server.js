const express = require('express')
    , app = express()
    , path = require('path')
    , cors = require('cors')
    , port = process.env.PORT || 8080;

app.use(cors())
app.use(require('./controllers'))
app.use(express.static(path.join(__dirname, "models", "output")))

// for prod
// app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
// })
var server = app.listen(port, () => console.log(`Listening on port ${port}`))
 server.timeout = 1000000000;