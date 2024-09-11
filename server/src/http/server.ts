import { createGoal } from "@/functions/create-goal"
import { createGoalCompletion } from "@/functions/create-goal-completion"
import { getWeekPendingGoals } from "@/functions/get-week-pending-goals"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod"
import z from "zod"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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

app.get("/pending-goals", async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

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

app.listen({ port: 3333 }).then(() => console.log("HTTP server running!"))
