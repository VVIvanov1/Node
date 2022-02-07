const express = require('express')

const app = express()


app.get('/', function(req,res,next){
    res.send('it morks!')
})

app.listen(process.env.PORT || 5000)

module.exports = app