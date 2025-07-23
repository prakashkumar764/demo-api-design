//import fs from "fs";


const fs = require('fs').promises
const path = require('path')
const read = async () => {
    const result = await fs.readFile(path.join(__dirname, 'package.json'), 'utf-8')
    console.log(result)
}
read()
console.log('Hi')

// const fs = require('fs')
// const path = require('path')
// const result = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
// console.log(result)
// console.log('Hi')

