import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { db } from '../../db/db-client'

export type Context = {
  db: PrismaClient
  req: Request
  res: Response
}

type ServerContext = {
  req: Request
  res: Response
}

export const createContent = (serverContext: ServerContext) => {
  return {
    db,
    ...serverContext,
  }
}
