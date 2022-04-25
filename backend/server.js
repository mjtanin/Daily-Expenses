const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorMiddleware } = require('./middlewares/errorMiddleware')

const app = express()
const PORT = process.env.PORT ?? 5000
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
  res.status(200).json({message: "Welcome to Daily Expenses API"})
})

app.use('/api/users', require('./routes/userRoutes'))
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`.yellow.underline.bold))
