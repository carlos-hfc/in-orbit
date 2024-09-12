import { XIcon } from "lucide-react"

import { Button } from "./ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createGoal } from "../http/create-goal"
import { queryClient } from "../lib/react-query"

const radioItems = [
  { value: "1", text: "1x na semana", emoji: "🥱" },
  { value: "2", text: "2x na semana", emoji: "🙂" },
  { value: "3", text: "3x na semana", emoji: "😎" },
  { value: "4", text: "4x na semana", emoji: "😜" },
  { value: "5", text: "5x na semana", emoji: "🤨" },
  { value: "6", text: "6x na semana", emoji: "🤯" },
  { value: "7", text: "Todos os dias da semana", emoji: "🔥" },
]

const createGoalForm = z.object({
  title: z
    .string()
    .min(1, { message: "Informe a atividade que deseja realizar" }),
  desiredWeeklyFrequency: z.coerce.number().int().min(1).max(7),
})

type CreateGoalSchema = z.infer<typeof createGoalForm>

export function CreateGoal() {
  const { register, control, handleSubmit, formState } =
    useForm<CreateGoalSchema>({
      resolver: zodResolver(createGoalForm),
    })

  async function handleCreateGoal({
    desiredWeeklyFrequency,
    title,
  }: CreateGoalSchema) {
    await createGoal({ desiredWeeklyFrequency, title })

    queryClient.invalidateQueries({
      queryKey: ["summary"],
    })
    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    })
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <XIcon className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-1 flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                autoFocus
                id="title"
                placeholder="Praticar exercícios, meditar, etc."
                {...register("title")}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredWeeklyFrequency">
                Quantas vezes na semana?
              </Label>
              <Controller
                defaultValue={1}
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      value={String(field.value)}
                      onValueChange={field.onChange}
                    >
                      {radioItems.map(item => (
                        <RadioGroupItem
                          key={item.value}
                          value={item.value}
                        >
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            {item.text}
                          </span>
                          <span className="text-lg leading-none">
                            {item.emoji}
                          </span>
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button
                className="flex-1"
                variant="secondary"
              >
                Fechar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1"
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
