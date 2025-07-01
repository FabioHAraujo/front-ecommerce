"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react" // Ícone para dar um charme

export function AvisoIA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Para testes, você pode comentar o localStorage para ver sempre o aviso
    const acknowledged = localStorage.getItem("gemini_notice_ack")
    if (!acknowledged) {
      setVisible(true)
    }
  }, [])

  function handleAcknowledge() {
    localStorage.setItem("gemini_notice_ack", "true")
    setVisible(false)
  }

  // A renderização é controlada pelo estado `visible`,
  // mas o unmount/mount dele é o que dispara a animação de entrada.
  if (!visible) return null

  return (
    // Container principal que posiciona o aviso
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Wrapper para a borda animada */}
      <div className="animated-border-card rounded-lg">
        <Card className="rounded-[7px]"> {/* O border-radius precisa ser um pouco menor que o wrapper */}
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  Todas as informações textuais e imagens de produtos foram geradas utilizando o Gemini e não são derivadas de nenhum produto real.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAcknowledge}
                  className="self-end" // Alinha o botão à direita
                >
                  OK, entendi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}