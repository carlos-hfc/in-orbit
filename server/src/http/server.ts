import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import { createGoalRoute } from "./routes/create-goal"
import { createCompletionRoute } from "./routes/create-completions"
import { getPendingGoalsRoute } from "./routes/get-pending-goals"
import { getWeekSummaryRoute } from "./routes/get-week-summary"

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(getPendingGoalsRoute)
app.register(createCompletionRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: 3333 }).then(() => console.log("HTTP server running!"))
