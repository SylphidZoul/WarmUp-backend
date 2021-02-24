const PostStore = require('../store/posts')

class PostsService {
  constructor () {
    this.store = new PostStore()
  }

  async getAllPosts () {
    const attributes = ['id', 'title', 'image', 'creationDate']
    const order = [['creationDate', 'desc'], ['id', 'desc']]
    const posts = await this.store.findAll(attributes, order)

    return posts
  }

  async getPost (id) {
    const where = { id }
    const post = await this.store.findOne(where)

    if (!post) throw new Error(`The post with id "${id}" doesn't exists.`)

    return post
  }

  async createPost (newPostData) {
    const newPost = { ...newPostData, creationDate: new Date() }

    try {
      const createdPost = await this.store.create(newPost)
      return { createdPost }
    } catch (error) {
      throw new Error(`The category with id "${newPostData.categoryId}" doesn't exists.`)
    }
  }

  async updatePost (id, updateData) {
    const where = { id }

    try {
      const wasUpdated = await this.store.update(where, updateData)
      if (!wasUpdated) throw new Error('The post could not be updated.')

      const updatedPost = await this.store.findOne(where)
      return { updatedPost }
    } catch (error) {
      if (error.sql) throw new Error(`The category with id "${updateData.categoryId}" doesn't exists.`)
      throw new Error(error.message)
    }
  }

  async deletePost (id) {
    const where = { id }
    const wasDeleted = await this.store.delete(where)
    if (!wasDeleted) throw new Error('The post could not be deleted.')

    return { deletedPost: id }
  }
}

module.exports = PostsService
