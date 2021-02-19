import path from 'path'
import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as types from './types'

export default makeSchema({
  types,
  plugins: [
    nexusPrisma({
      prismaClient: (ctx) => ctx.db,
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts'
    ),
    schema: path.join(__dirname, './schema.graphql'),
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'db',
      },
    ],
  },
})
