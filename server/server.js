const express = require('express')
    , app = express()
    , path = require('path')
    , cors = require('cors')
    , fs = require("fs")
    , http = require('http')
    , https = require('https')
    , port = process.env.PORT || 8080
    , portSecure = process.env.PORTSECURE || 8443;

app.use(cors())
app.use(require('./controllers'))
app.use(express.static(path.join(__dirname, "models", "output")))

// ------------------------------- FOR PRODUCTION ------------------------------- \\
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})
// ------------------------------------------------------------------------------- \\

var httpServer = http.createServer(app);
httpServer.listen(port, () => console.log(`Listening on port ${port} for http`));
httpServer.timeout = 2147483647; // max 32 bit signed integer

var httpsServer = https.createServer({
    key: fs.readFileSync('cert/server.key'),
    cert: fs.readFileSync('cert/server.cert')
  }, app)

httpsServer.listen(portSecure, () => console.log(`Listening on port ${portSecure} for https`));
httpsServer.timeout = 2147483647; // max 32 bit signed integer
