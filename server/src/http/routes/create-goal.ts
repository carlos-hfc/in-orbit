import { createGoal } from "@/functions/create-goal"
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod"
import z from "zod"

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/goals",
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const body = request.body

      await createGoal({
        desiredWeeklyFrequency: body.desiredWeeklyFrequency,
        title: body.title,
      })
    }
  )
}
