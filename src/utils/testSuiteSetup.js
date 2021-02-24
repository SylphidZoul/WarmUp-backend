const MySQLService = require('../store/mysql')

beforeAll(() => {
  jest.spyOn(console, 'warn')
  console.warn.mockImplementation(() => null)
})

afterAll((done) => {
  MySQLService.close()
  done()
})
