const MongoClient = require('mongodb').MongoClient
const { Db } = require('mongodb')
const { DATABASE_URL } = require('./constant')


MongoClient.connect(DATABASE_URL, async (err, client) => {
  if (err) throw err
  await seed(client.db())
  client.close()
})

/** @type {import('./types').User[]} */
const data = [
  {
    ID: 858985698,
    hoVaTen: 'Phạm Văn Tuấn',
    tuoi: 25,
    canCuoc: '037153000257',
    lienHe: {
      dienThoai: '098589875',
      email: 'pvt@gmail.com',
      diaChi: '85 Hàng Bài, Hoàn Kiếm, Hà Nội',
    },
    nguoiPhuThuoc: ['023153000257', '032153000257', '023153000257'],
  },
  {
    ID: 111111111,
    hoVaTen: 'John Doe',
    tuoi: 22,
    canCuoc: '023153000257',
    lienHe: {
      dienThoai: '091111111',
      email: 'jd@gmail.com',
      diaChi: 'New York, US',
    },
    nguoiPhuThuoc: ['037153000257', '032153000257', '023153000257'],
  },
  {
    ID: 222222222,
    hoVaTen: 'David Moi',
    tuoi: 40,
    canCuoc: '032153000257',
    lienHe: {
      dienThoai: '092222222',
      email: 'dm@gmail.com',
      diaChi: 'LonDon, UK',
    },
    nguoiPhuThuoc: ['037153000257', '023153000257'],
  },
  {
    ID: 333333333,
    hoVaTen: 'Jackie Chan',
    tuoi: 55,
    canCuoc: '033153000257',
    lienHe: {
      dienThoai: '092222222',
      email: 'jc@gmail.com',
      diaChi: 'California, US',
    },
    nguoiPhuThuoc: ['037153000257', '023153000257'],
  },
]

/** @param {Db} db */
async function seed(db) {
  const userCollection = db.collection('users')
  try {
    userCollection.deleteMany({})
    const result = await userCollection.insertMany(data)
    console.log(result)
  } catch (error) {
    throw error
  }
}
