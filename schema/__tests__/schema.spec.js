const schema = require('../../schema/schema')
const graphql = require('graphql')
const axios = require('axios')
const db = require('../../db.json')
jest.mock('axios')

describe('GraphQLAPI', () => {
  describe('#RootQuery', () => {
    describe('#user', () => {
      describe('when request user is successful', () => {
        it('should return id equals', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve({ data: db.users[0] }))

          const query = `
                query {
                  user {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { data } = result
          expect(data.user.id).toBe('1')
        })
      })
      describe('when request user with company', () => {
        describe('when company request is successful', () => {
          it('should return id equals', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: db.users[0] })).mockImplementation(() => Promise.resolve({ data: db.companies[0] }))

            const query = `
                  query {
                    user {
                      id
                      company {
                        id
                      }
                    }
                  }
                `
            const result = await graphql.graphql(schema, query, {}, {})
            const { data } = result
            expect(data.user.id).toBe('1')
            expect(data.user.company.id).toBe('1')
          })
        })
        describe('when company request is failed', () => {
          it('should return id equals', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: db.users[0] })).mockImplementation(() => Promise.reject({ data: db.companies[0] }))

            const query = `
                  query {
                    user {
                      id
                      company {
                        id
                      }
                    }
                  }
                `
            const result = await graphql.graphql(schema, query, {}, {})
            const { errors } = result
            expect(errors).toBeDefined()
          })
        })
      })
      describe('when request user failed', () => {
        it('contains errors', async () => {
          axios.get.mockImplementationOnce(() => Promise.reject({ error: 'failed' }))

          const query = `
                query {
                  user {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
    })
    describe('#company', () => {
      describe('when request company is successful', () => {
        it('should return id equals', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve({ data: db.companies[0] }))

          const query = `
                query {
                  company {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { data } = result
          expect(data.company.id).toBe('1')
        })
      })
      describe('when request company with users', () => {
        describe('when users request is successful', () => {
          it('should return id equals', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: db.companies[0] })).mockImplementation(() => Promise.resolve({ data: db.users }))

            const query = `
                  query {
                    company {
                      id
                      name
                      users {
                        id
                      }
                    }
                  }
                `
            const result = await graphql.graphql(schema, query, {}, {})
            const { data } = result
            expect(data.company.users).toHaveLength(3)
          })
        })
        describe('when users request is failed', () => {
          it('should return id equals', async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: db.companies[0] })).mockImplementation(() => Promise.reject({ data: db.companies[0] }))

            const query = `
                  query {
                    company {
                      id
                      users {
                        id
                      }
                    }
                  }
                `
            const result = await graphql.graphql(schema, query, {}, {})
            const { errors } = result
            expect(errors).toBeDefined()
          })
        })
      })
      describe('when request company  failed', () => {
        it('contains errors', async () => {
          axios.get.mockImplementationOnce(() => Promise.reject({ error: 'failed' }))

          const query = `
                query {
                  company {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
    })
  })
  describe('#Mutations', () => {
    describe('#addUser', () => {
      describe('when post addUser is successful', () => {
        it('should return id equals', async () => {
          axios.post.mockImplementationOnce(() => Promise.resolve({ data: db.users[0] }))

          const query = `
                mutation {
                  addUser(firstName: "Charley", age: 20) {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { data } = result
          expect(data.addUser.id).toBe('1')
        })
      })
      describe('when post addUser failed', () => {
        it('contains errors', async () => {
          axios.post.mockImplementationOnce(() => Promise.reject({ error: 'failed' }))

          const query = `
                mutation {
                  addUser(firstName: "Charley", age: 20) {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
      describe('when receive invalid args', () => {
        it('contains errors', async () => {
          axios.post.mockImplementationOnce(() => Promise.resolve({ data: db.users[0] }))

          const query = `
                mutation {
                  addUser {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
    })
    describe('#deleteUser', () => {
      describe('when delete user is successful', () => {
        it('should return id equals', async () => {
          axios.delete.mockImplementationOnce(() => Promise.resolve({ data: db.users[0] }))

          const query = `
                mutation {
                  deleteUser(id: "1") {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { data } = result
          expect(data.deleteUser.id).toBe('1')
        })
      })
      describe('when delete user failed', () => {
        it('contains errors', async () => {
          axios.delete.mockImplementationOnce(() => Promise.reject({ error: 'failed' }))

          const query = `
                mutation {
                  deleteUser(id: "1") {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
      describe('when receive invalid args', () => {
        it('contains errors', async () => {
          axios.post.mockImplementationOnce(() => Promise.resolve({ data: db.users[0] }))

          const query = `
                mutation {
                  deleteUser {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
    })
    describe('#editUser', () => {
      describe('when patch user is successful', () => {
        it('should return id equals', async () => {
          axios.patch.mockImplementationOnce(() => Promise.resolve({ data: db.users[0] }))

          const query = `
                mutation {
                  editUser(id: "1") {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { data } = result
          expect(data.editUser.id).toBe('1')
        })
      })
      describe('when patch user failed', () => {
        it('contains errors', async () => {
          axios.patch.mockImplementationOnce(() => Promise.reject({ error: 'failed' }))

          const query = `
                mutation {
                  editUser(id: "1") {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
      describe('when receive invalid args', () => {
        it('contains errors', async () => {
          axios.patch.mockImplementationOnce(() => Promise.resolve({ data: db.users[0] }))

          const query = `
                mutation {
                  editUser {
                    id
                  }
                }
              `
          const result = await graphql.graphql(schema, query, {}, {})
          const { errors } = result
          expect(errors).toBeDefined()
        })
      })
    })
  })
})
