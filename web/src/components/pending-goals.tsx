import { useQuery } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"

import { getPendingGoals } from "../http/get-pending-goals"
import { createGoalCompletion } from "../http/goal-completion"
import { queryClient } from "../lib/react-query"
import { OutlineButton } from "./ui/outline-button"

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 1min
  })

  if (!data) return null

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({
      queryKey: ["summary"],
    })
    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCompleteGoal(goal.id)}
        >
          <PlusIcon className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
