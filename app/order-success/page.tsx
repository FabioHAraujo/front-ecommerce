import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderSuccessPage() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />

        <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>

        <p className="text-xl text-muted-foreground mb-8">
          Obrigado pela sua compra. Seu pedido foi processado com sucesso.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Package className="h-5 w-5" />
              Detalhes do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Número do Pedido:</span>
              <span className="font-mono">#{orderNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span className="text-green-600 font-medium">Confirmado</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Previsão de Entrega:</span>
              <span>3-5 dias úteis</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Você receberá um e-mail de confirmação com os detalhes do seu pedido e informações de rastreamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                Continuar Comprando
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/orders">Ver Meus Pedidos</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
