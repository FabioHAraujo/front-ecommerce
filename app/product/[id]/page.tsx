"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProductById } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const product = getProductById(params.id)
  const { dispatch } = useCart()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!product.inStock) return

    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product })
    }

    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} avaliações)
              </span>
            </div>

            <p className="text-4xl font-bold text-primary mb-6">
              R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>

            {!product.inStock && (
              <Badge variant="destructive" className="mb-4">
                Produto Esgotado
              </Badge>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantidade:</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
              </Button>

              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product Features */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Informações do Produto</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Garantia de 12 meses</li>
              <li>• Entrega gratuita acima de R$ 200</li>
              <li>• Troca grátis em 30 dias</li>
              <li>• Suporte técnico especializado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
