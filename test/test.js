const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
const assert = require('chai').assert

const database = require('../database')
chai.use(chaiHttp)

const baseURL = 'http://localhost:8080'

/** @type {import("../types").User} */
const user = {
  ID: 0,
  hoVaTen: 'Great Jame',
  tuoi: 25,
  canCuoc: '055153000257',
  lienHe: {
    dienThoai: '0985555555',
    email: 'gj@gmail.com',
    diaChi: 'UK',
  },
  nguoiPhuThuoc: [],
}
describe('Test API', () => {
  let _id

  before(async () => {
    await database.connectToServer()
  })

  beforeEach(async () => {
    const result = await database.getDB().collection('users').insertOne(user)
    _id = result.insertedId
  })

  afterEach(async () => {
    await database.getDB().collection('users').deleteOne({ _id })
  })

  describe('Test cap nhat nguoi nop thue', () => {
    it('Test PUT /users voi ID khong ton tai', (done) => {
      chai
        .request(baseURL)
        .put('/users/-5')
        .end((err, res) => {
          assert.equal(res.status, 404)
          assert.equal(res.body.message, 'User not found')
          done()
        })
    })

    it('Test PUT /users voi du lieu moi', (done) => {
      const data = {
        ID: 5,
        hoVaTen: 'Bad Jame',
        tuoi: 23,
        canCuoc: '123',
        lienHe: {
          dienThoai: '555555',
          email: 'bj@gmail.com',
          diaChi: 'VN',
        },
        nguoiPhuThuoc: ['123'],
      }
      chai
        .request(baseURL)
        .put(`/users/${user.ID}`)
        .send(data)
        .end((err, res) => {
          const { ID, hoVaTen, tuoi, canCuoc, lienHe, nguoiPhuThuoc } = res.body
          assert.equal(res.type, 'application/json')
          assert.equal(res.status, 200)
          assert.equal(ID, data.ID)
          assert.isNumber(ID)
          assert.equal(hoVaTen, data.hoVaTen)
          assert.equal(tuoi, data.tuoi)
          assert.equal(canCuoc, data.canCuoc)
          assert.deepEqual(lienHe, data.lienHe)
          assert.isArray(nguoiPhuThuoc)
          assert.lengthOf(nguoiPhuThuoc, 1)
          done()
        })
    })
  })

  describe('Test tim kiem thong tin theo so dien thoai', () => {
    it('Test GET /users/phone/:sdt voi sdt khong ton tai', (done) => {
      chai
        .request(baseURL)
        .get(`/users/phone/00000000`)
        .end((err, res) => {
          assert.equal(res.status, 404)
          assert.equal(res.body.message, 'User not found')
          done()
        })
    })

    it('Test GET /users/phone/:sdt voi sdt da co', (done) => {
      chai
        .request(baseURL)
        .get(`/users/phone/${user.lienHe.dienThoai}`)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isOk(res.body.lienHe)
          assert.equal(res.body.lienHe.dienThoai, user.lienHe.dienThoai)
          done()
        })
    })
  })
})
