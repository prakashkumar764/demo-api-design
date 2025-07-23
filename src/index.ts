import * as dotenv from 'dotenv'
dotenv.config()
import config from './config'
import app from "./server"


//const app = require('./server')

app.listen(config.port, () => {
    console.log(`Hello at http://localhost:${config.port}`)
})



// // Create a simple HTTP server
// const http = require('http');

// const server = http.createServer((req, res) => {

//     if (req.method === 'GET' && req.url === '/') {
//         console.log('Hello from server')
//         res.end()
//     }
// });

// server.listen(3001, () => {
//     console.log('Server running at http://localhost:3001/')
// });