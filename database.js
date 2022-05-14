const MongoClient = require('mongodb').MongoClient

const { Db } = require('mongodb')
const { DATABASE_URL } = require('./constant')

/**
 * @type {Db}
 */
let db

const connectToServer = async (callback) => {
  if (!db) {
    const client = await MongoClient.connect(DATABASE_URL)
    db = client.db()
  }
  if (callback) {
    console.log('Successfully connected to MongoDB.')
    callback()
  }
}

const getDB = () => {
  return db
}

module.exports = {
  connectToServer,
  getDB: getDB,
}
