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

const radioItems = [
  { value: "1", text: "1x na semana", emoji: "🥱" },
  { value: "2", text: "2x na semana", emoji: "🙂" },
  { value: "3", text: "3x na semana", emoji: "😎" },
  { value: "4", text: "4x na semana", emoji: "😜" },
  { value: "5", text: "5x na semana", emoji: "🤨" },
  { value: "6", text: "6x na semana", emoji: "🤯" },
  { value: "7", text: "Todos os dias da semana", emoji: "🔥" },
]
export function CreateGoal() {
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

        <form className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                autoFocus
                id="title"
                placeholder="Praticar exercícios, meditar, etc."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredWeeklyFrequency">
                Quantas vezes na semana?
              </Label>
              <RadioGroup id="desiredWeeklyFrequency">
                {radioItems.map(item => (
                  <RadioGroupItem key={item.value} value={item.value}>
                    <RadioGroupIndicator />
                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      {item.text}
                    </span>
                    <span className="text-lg leading-none">{item.emoji}</span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button type="button" className="flex-1">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
