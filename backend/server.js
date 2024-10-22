import 'dotenv/config'
import express from 'express'

// Express app
const app = express()

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.get('/', (req, res) => {
    res.json({msg: "welcome to the app!"})
})

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})

process.env