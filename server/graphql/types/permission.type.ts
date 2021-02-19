import { objectType, extendType } from 'nexus'

export const Permission = objectType({
  name: 'Permission',
  definition(t) {
    t.model.id()
    t.model.code()
    t.model.label()
    t.model.createdAt()
    t.model.userId()
  },
})

export const PermissionQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.permission()
    t.crud.permissions()
  },
})

export const PermissionMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOnePermission()
    t.crud.updateOnePermission()
  },
})
