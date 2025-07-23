import supertest from 'supertest'
import app from '../server'

describe('GET /', () => {

    it('should send back some datas', async () => {
        const res = await supertest(app)
        .get('/')
        expect(res.body.message).toBe('Hello')
    })

})