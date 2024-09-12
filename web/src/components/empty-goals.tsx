import { PlusIcon } from "lucide-react"

import letsStartImg from "./assets/lets-start.svg"
import logoImg from "./assets/logo.svg"
import { Button } from "./ui/button"
import { DialogTrigger } from "./ui/dialog"

export function EmptyGoals() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-8">
      <img src={logoImg} alt="in.orbit" />
      <img src={letsStartImg} alt="" />
      <p className="text-zinc-300 text-center leading-relaxed max-w-80">
        Você ainda não encontrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
