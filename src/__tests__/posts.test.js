const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('Posts endpoint /posts', () => {
  describe('Bad request errors', () => {
    it('Should complains about the id param.', async (done) => {
      const response = await request.get('/posts/asdasdasd')
      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The id must be an integer number greater than 0.')
      done()
    })

    it('Should complains about the image url', async (done) => {
      const response = await request
        .patch('/posts/1')
        .send({ image: 'testtesttest' })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The image url must ends in (.png|.jpg|.jpeg|.gif) and cannot be longer than 1000 characters.')
      done()
    })

    it('Should complains about missing data', async (done) => {
      const response = await request
        .post('/posts')
        .send({
          title: 'test',
          image: 'http://www.yourimages.com/sale.gif',
          categoryId: 1
        })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The content must be string and cannot be longer than 65500 characters.')
      done()
    })

    it('Should not find any post', async (done) => {
      const response = await request.get('/posts/12343')
      expect(response.status).toBe(404)
      expect(response.body.data).toBe(`The post with id \"12343\" doesn't exists.`)
      done()
    })

    it('Should not update any post', async (done) => {
      const response = await request
        .patch('/posts/12343')
        .send({
          title: 'hello world'
        })
      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The post could not be updated.')
      done()
    })

    it('Should not delete any post', async (done) => {
      const response = await request.delete('/posts/12343')
      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The post could not be deleted.')
      done()
    })
  })

  describe('Successful requests', () => {
    let testPostId

    it('Should return all posts with required the structure', async (done) => {
      const requiredKeys = ['id', 'title', 'image', 'creationDate', 'category']
      const response = await request.get('/posts')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(Object.keys(response.body.data[0])).toStrictEqual(requiredKeys)
      done()
    })

    it('Should create a new post', async (done) => {
      const newPost = {
        title: 'test title',
        content: 'test content',
        image: 'http://testurl.com/image.png',
        categoryId: 2
      }
      const response = await request
        .post('/posts')
        .send(newPost)
      const { id, category, creationDate, ...createdPost} = response.body.data.createdPost
      testPostId = id

      expect(response.status).toBe(201)
      expect(createdPost).toStrictEqual(newPost)
      done()
    })

    it('Should update the created post', async (done) => {
      const updates = {
        title: 'test title2'
      }
      const response = await request
        .patch(`/posts/${testPostId}`)
        .send(updates)
      
      expect(response.status).toBe(201)
      expect(response.body.data.updatedPost.title).toBe(updates.title)
      done()
    })

    it('Should delete the created post', async (done) => {
      const response = await request.delete(`/posts/${testPostId}`)
      expect(response.status).toBe(202)
      expect(response.body.data.deletedPost).toBe(`${testPostId}`)
      done()
    })
  })
})