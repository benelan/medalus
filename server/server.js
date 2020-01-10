const express = require('express')
    , app = express()
    , path = require('path')
    , port = process.env.PORT || 8080;


app.use(require('./controllers'))
app.use(express.static('public'))

app.use(function (req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


// for prod
// app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
// })


app.listen(port, () => console.log(`Listening on port ${port}`))