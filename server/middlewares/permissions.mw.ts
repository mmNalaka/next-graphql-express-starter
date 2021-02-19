import { rule, shield, and, or } from 'graphql-shield'
import { Context } from '../graphql/context'

const ruleIsAuthenticated = rule({ cache: 'contextual' })(
  async (_parent: any, _args: any, ctx: Context, _info: any) => {
    return ctx.req.isAuthenticated()
  }
)

const ruleIsAdmin = rule({ cache: 'contextual' })(
  async (_parent: any, _args, ctx: Context, _info: any) => {
    // @ts-ignore
    return ctx.req.session.passport.user.role === 'ADMIN'
  }
)

export const permissions = shield({
  Query: {
    user: and(ruleIsAuthenticated, or(ruleIsAdmin)),
    users: ruleIsAdmin,
  },
})
