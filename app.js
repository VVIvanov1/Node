const express = require('express')

const app = express()
const appRouter = require('./routes/index')


app.get('/', function (req, res, next) {
    res.send('it morks!')
})

app.listen(process.env.PORT || 5000)


app.use('/new', appRouter)
module.exports = app