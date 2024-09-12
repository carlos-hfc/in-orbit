import { createGoalCompletion } from "@/functions/create-goal-completion"
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod"
import z from "zod"

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/completions",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const body = request.body

      await createGoalCompletion({
        goalId: body.goalId,
      })
    }
  )
}
