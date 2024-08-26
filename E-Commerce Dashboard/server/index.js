const express = require('express')
const cors = require('cors')
require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')
const JWT = require('jsonwebtoken');
const jwtKey = 'node-project'

const app = express()
app.use(express.json())
app.use(cors())

app.post('/signup', async (req, res) => {
    const user = new User(req.body)
    let data = await user.save()
    data = data.toObject();
    delete data.password
    JWT.sign({ data }, jwtKey, { expiresIn: '3h' }, (err,token) => {
        if (err) {
            res.sendFile({ result: 'Something went wrong, please try again' })
        }
        res.send({ data, auth: token })
    })
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            JWT.sign({ user }, jwtKey, { expiresIn: '3h' }, (err,token) => {
                if (err) {
                    res.sendFile({ result: 'Something went wrong, please try again' })
                }
                res.send({ user, auth: token })
            })
        } else {
            res.send({ result: 'No user found' })
        }
    } else {
        res.send({ result: 'No user found' })
    }
})

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})

app.get('/products', async (req, res) => {
    let product = await Product.find();
    if (product.length > 0) {
        res.send(product)
    } else {
        res.send({ result: 'No products found' })
    }
})

app.delete('/product/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get('/product/:id', async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: 'No record found' })
    }
})
app.put('/product/:id', async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    if (result) {
        res.send(result)
    } else {
        res.send({ result: 'No record found' })
    }
})

//search api
app.get('/search/:key', async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key }, },
            { category: { $regex: req.params.key }, },
            { company: { $regex: req.params.key }, },
        ]
    })
    res.send(result)
})



app.listen(5000, () => {
    console.log('app is listening on port 5000')
})