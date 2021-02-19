import { objectType, extendType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.firstName()
    t.model.lastName()
    t.model.role()
    t.model.picture()
    t.model.createdAt()
    t.model.lastLoggedIn()
    t.model.permissions()
  },
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.updateOneUser()
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.user()
    t.crud.users()
  },
})
