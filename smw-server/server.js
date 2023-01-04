const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()
const port = process.env.PORT
const API_URI = process.env.API_URI


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const toyModel = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category_id: Number
}, { versionKey: false })
const categoryModel = new mongoose.Schema({
    name: String
}, { versionKey: false })


const Toy = mongoose.model('Toy', toyModel)
const Category = mongoose.model('Category', categoryModel)

app.listen(port, () => {

    mongoose.set('strictQuery', false)

    mongoose.connect(API_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log(`Scooter, Écouteurs 🎶, port ${port} est guetteur`))
        .catch(() => console.log('Failed connection to MongoDB'))

    let db = mongoose.connection

    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

})

// CATEGORIES ROUTES

app.get('/categories', async (req, res) => {

    const category = await Category.find()
    res.send(category)

})

app.get('/categories/:id', async (req, res) => {

    const category = await Category.find()

    if (category[req.params.id] == undefined)
        res.sendStatus(404)
    else
        res.send(category[req.params.id])

})

app.post('/categories', (req, res) => {
    const newCategory = Category.create({ name: req.body.name },
        function (err, param) {
            if (err) return handleError(err)
            else res.send(req.body)
        })
})

app.put('/categories/:id', async (req, res) => {
    const category = await Category.find()

    if (category[req.params.id] == undefined)
        res.sendStatus(404)
    else {
        category[req.params.id].name = req.body.name
        await category[req.params.id].save()
        res.send(category[req.params.id])
    }

    // res.send(category[req.params.id])
})

app.delete('/categories/:id', async (req, res) => {

    const category = await Category.find()

    if (category[req.params.id] == undefined)
        res.sendStatus(404)
    else {
        const deleteCategory = await Category.deleteOne({ name: category[req.params.id].name })
        // deleteCategory.deletedCount
    }
})

// TOYS ROUTES 

app.get('/toys', async (req, res) => {

    const toys = await Toy.find()
    res.send(toys)
})

app.get('/toys/:id', async (req, res) => {

    const toy = await Toy.find()

    if (toy[req.params.id] == undefined)
        res.sendStatus(404)
    else
        res.send(toy[req.params.id])

})

// app.post('/categories', (req, res) => {
//     const newCategory = Category.create({ name: req.body.name },
//         function (err, param) {
//             if (err) return handleError(err)
//             else res.send(req.body)
//         })
// })

app.post('/toys', (req, res) => {

    // const newToy = new Toy(req.body)
    // newToy.save()
    // res.send(newToy)

    const newToy = Toy.create(req.body,
        function (err, param) {
            if (err) return handleError(err)
            else res.send(req.body)
        })
})

app.put('/toys/:id', async (req, res) => {

    const toy = await Toy.find()
    const toyToUpdate = toy[req.params.id]

    if (toyToUpdate == undefined) res.sendStatus(404)

    else {

        if (req.body.name != undefined) toyToUpdate.name = req.body.name
        if (req.body.price != undefined) toyToUpdate.price = req.body.price
        if (req.body.description != undefined) toyToUpdate.description = req.body.description
        if (req.body.category_id != undefined) toyToUpdate.category_id = req.body.category_id

        await toyToUpdate.save()
        res.send(toy)

    }
})

app.delete('/toys/:id', async (req, res) => {

    const toy = await Toy.find()

    if (toy[req.params.id] == undefined) res.sendStatus(404)
    else {
        const deleteToy = await Toy.deleteOne({ name: toy[req.params.id].name })
        res.send(toy)
        // deleteToy.deletedCount
    }
})