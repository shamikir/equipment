import Koa from 'koa'
import Router from 'koa-router'
import KoaBody from 'koa-body'
import { AWSError } from 'aws-sdk'

import { getEquipments, getEquipment, postEquipment } from './db'
import { equipmentSchema } from './types/equipmentSchema'

export const app = new Koa()
export const router = new Router()

router
  .get('/equipments', async (ctx: Koa.Context) => {
    const query = <number>parseInt(<string>ctx.query.limit)|| undefined
    ctx.body = await getEquipments(query)
  })
  .get('/equipment/:id', async (ctx: Koa.Context) => {
    ctx.body = await getEquipment(parseInt(ctx.params.id))
  })
  .post('/equipment', KoaBody(), async (ctx: Koa.Context) => {
    const body = equipmentSchema.validate(ctx.request.body)
    if (body.error) {
      ctx.body = "Validation error"
      ctx.status = 400
    } else {
      try {
        ctx.body = await postEquipment(body.value)
        ctx.status = 201
      } catch (e) {
        const err = e as AWSError
        if (err.name === "ConditionalCheckFailedException") {
          ctx.body = "Equipment Number already exists"
          ctx.status = 400
        } else {
          ctx.body = "Error"
          ctx.status = 400
        }
      }
    }
  })

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8000)
