const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const getDB = require('./db')

const app = express()
const port = process.env.PORT * 1 || 4000

app.use(cors())
app.use(bodyParser.json())

app.post('/', async (req, res) => {
  const {users, id} = await getDB();
  const userID = id(req.body.userID || undefined)
  const pokemonID = req.body.pokemonID
  
  const result = await users.findOneAndUpdate(
    { _id: userID },
    { $push: { favourites: pokemonID } },
    { upsert: true }
  )

  res.json({ _id: userID, favourites: result.value ? [...result.value.favourites, pokemonID] : [pokemonID] })
})

app.delete('/', async (req, res) => {
  const {users, id} = await getDB();
  const userID = id(req.body.userID || undefined)
  const pokemonID = req.body.pokemonID
  
  const result = await users.findOneAndUpdate(
    { _id: userID },
    { $pull: { favourites: pokemonID } },
    { upsert: true }
  )

  res.json({ _id: userID, favourites: result.value ? result.value.favourites.filter(id=>id!==pokemonID) : [] })
})

app.get('/', async (req, res) => {
  const {users, id} = await getDB();
  const userID = id(req.query.userID || undefined)

  const selector = { _id: userID }

  const user = await users.findOne(selector)

  res.json(user || {...selector, favourites: []})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})