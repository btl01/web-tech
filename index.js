const express = require('express')
const database = require('./database')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', require('./router/user'))

const PORT = 8080
database.connectToServer(() => {
  app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
  })
})
