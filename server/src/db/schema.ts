import { createId } from "@paralleldrive/cuid2"
import { text, integer, timestamp, pgTable } from "drizzle-orm/pg-core"

export const goals = pgTable("goals", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  desiredWeeklyFrequency: integer("desiredWeeklyFrequency").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const goalCompletions = pgTable("goalCompletions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text("goalId")
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
})
