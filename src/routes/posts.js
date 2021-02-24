const express = require('express')
const PostsService = require('../services/posts')
const Response = require('../utils/response')
const validateData = require('../middleware/validateData')
const { idParam, createBody, updateBody } = require('../utils/schema/posts')

const router = express()
const postsService = new PostsService()

router.get('/', async (_, res) => {
  try {
    const posts = await postsService.getAllPosts()
    Response.success(res, posts, 200)
  } catch (error) {
    Response.error(res, error.message, 400, error)
  }
})

router.get('/:id', validateData(idParam, 'params'), async (req, res) => {
  try {
    const post = await postsService.getPost(req.params.id)
    Response.success(res, post, 200)
  } catch (error) {
    Response.error(res, error.message, 400, error)
  }
})

router.post('/', validateData(createBody), async (req, res) => {
  try {
    const createdPost = await postsService.createPost(req.body)
    Response.success(res, createdPost, 201)
  } catch (error) {
    Response.error(res, error.message, 400, error)
  }
})

router.patch('/:id', validateData(idParam, 'params'), validateData(updateBody), async (req, res) => {
  try {
    const updatedPost = await postsService.updatePost(req.params.id, req.body)
    Response.success(res, updatedPost, 201)
  } catch (error) {
    Response.error(res, error.message, 400, error)
  }
})

router.delete('/:id', validateData(idParam, 'params'), async (req, res) => {
  try {
    const deletedPostId = await postsService.deletePost(req.params.id)
    Response.success(res, deletedPostId, 202)
  } catch (error) {
    Response.error(res, error.message, 400, error)
  }
})

module.exports = router
