const postModel = require('../models/posts')
const categoryModel = require('../models/categories')

class PostStore {
  constructor () {
    this.table = postModel
    this.defaultOptions = {
      include: [{
        model: categoryModel,
        required: false
      }],
      raw: true,
      nest: true
    }
  }

  async findAll (attributes, order, where) {
    const posts = await this.table.findAll({
      attributes,
      where,
      order,
      ...this.defaultOptions
    })

    return posts
  }

  async findOne (where) {
    const post = await this.table.findOne({
      where,
      ...this.defaultOptions
    })

    return post
  }

  async create (newPost) {
    const createdPost = await this.table.create(newPost)
    return createdPost
  }

  async update (where, updates) {
    const updatedPost = await this.table.update(updates, { where })
    return updatedPost[0]
  }

  async delete (where) {
    const deletedPost = await this.table.destroy({ where })
    return deletedPost
  }
}

module.exports = PostStore
