import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from "./handlers/user";

//const express = require('express')

const app = express()

// const customLogger = (message) => (req, res, next) => {
//     console.log(`Hello from ${message}`)
//     next()

// }

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(customLogger('customer logger'))

// app.use((req, res, next) => {
//     req.shhhh_secreat = 'doggy'
//     // res.status(401)
//     // res.send('Nope')
// })

// app.get('/', (req, res) => {
//     console.log('Hello from express')
//     res.status(200)
//     res.json({ message: 'Hello Server' })
// })

// app.get('/', (req, res) => {
//     console.log('Hello from express')
//     res.status(200)
//     res.json({ message: 'Hello Server' })
// })

app.get("/", (req, res, next) => {
    res.json({ message: 'Hello' })
    // setTimeout(() => {
    //     next(new Error("oops error"))
    // }, 1)
});

app.use('/api', protect, router)

app.post('/user', createNewUser);
app.post('/signin', signin)

app.use((err, req, res, next) => {
    // console.log('Error from :', err)
    // res.json({ message: `had an error: ${err.message}` })
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' })
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' })
    } else {
        res.status(500).json({ message: 'opps thats on us' })
    }
});



//module.exports = app
export default app