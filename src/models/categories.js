const Sequelize = require('sequelize')
const MYSQLService = require('../store/mysql')

const categoryModel = MYSQLService.define('categories', {
  id: {
    type: Sequelize.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  categoryName: {
    type: Sequelize.STRING(100),
    allowNull: false,
    field: 'category_name'
  }
})

categoryModel.sync().then(() => console.log('Categories table synced!'))

module.exports = categoryModel
