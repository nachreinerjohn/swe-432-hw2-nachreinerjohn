const express = require('express');
const fetch = require('node-fetch');

const app = express()
app.use(express.json())
const port = 3000

//const cities = ["Fairfax", "Vienna", "Falls Church", "Arlington"];

//const populations = [24019, 16489, 14128, 236842];

const itemRouter = require('./routes/items')

app.use('/items', itemRouter)

// app.get('/populations', (req, res) => {
//   return res.json(populations)
// })

module.exports = app;