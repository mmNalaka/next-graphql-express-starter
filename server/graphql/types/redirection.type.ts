import { objectType, extendType } from 'nexus'

export const Redirection = objectType({
  name: 'Redirection',
  definition(t) {
    t.model.id()
    t.model.from()
    t.model.to()
    t.model.isRegex()
    t.model.type()
    t.model.description()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.createdBy()
    t.model.updatedBy()
  },
})

export const RedirectionQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.redirection()
    t.crud.redirections()
  },
})

export const RedirectionMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneRedirection()
    t.crud.updateOneRedirection()
  },
})
