"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AvisoIA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const acknowledged = localStorage.getItem("gemini_notice_ack")
    if (!acknowledged) {
      setVisible(true)
    }
  }, [])

  function handleAcknowledge() {
    localStorage.setItem("gemini_notice_ack", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-background border-b border-muted shadow-md">
      <Card className="rounded-none border-none">
        <CardContent className="py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Todas as informações textuais e imagens de produtos foram geradas utilizando o Gemini e não são derivadas de nenhum produto real.
          </p>
          <Button variant="outline" onClick={handleAcknowledge}>
            OK
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
