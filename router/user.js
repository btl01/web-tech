const router = require('express').Router()

const database = require('../database')

function userCollection() {
  return database.getDB().collection('users')
}

router.get('/', async (req, res) => {
  try {
    const users = await userCollection().find().toArray()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const user = await userCollection().findOne({ ID: id })
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = req.body
    const result = await userCollection().insertOne(user)
    user._id = result.insertedId
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { value } = await userCollection().findOneAndReplace(
      { ID: id },
      req.body,
      { returnDocument: 'after' }
    )
    if (value) {
      res.json(value)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await userCollection().deleteOne({ ID: id })
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/many', async (req, res) => {
  try {
    const result = await userCollection().insertMany(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/phone/:phone', async (req, res) => {
  try {
    const phone = req.params.phone
    const user = await userCollection().findOne({ 'lienHe.dienThoai': phone })
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
