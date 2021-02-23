require('dotenv').config()

module.exports = {
  API: {
    PORT: process.env.PORT
  },
  MYSQL: {
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PW,
    DATABASE: process.env.MYSQL_DB
  },
  CORS: {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
  }
}
