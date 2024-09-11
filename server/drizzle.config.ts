import { defineConfig } from "drizzle-kit"
import { env } from "@/env"

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./.migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: String(env.DATABASE_URL),
  },
})
