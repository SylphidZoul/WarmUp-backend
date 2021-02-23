const Sequelize = require('sequelize')
const MYSQLService = require('../store/mysql')
const categoryModel = require('./categories')

const postModel = MYSQLService.define('posts', {
  id: {
    type: Sequelize.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  categoryId: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false,
    field: 'category_id',
    references: {
      model: categoryModel,
      key: 'id'
    }
  },
  creationDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'creation_date'
  }
})

postModel.belongsTo(categoryModel)

postModel.sync().then(() => console.log('Posts table synced!'))

module.exports = postModel
