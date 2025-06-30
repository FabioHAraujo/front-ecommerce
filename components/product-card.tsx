"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    if (!product.inStock) return

    dispatch({ type: "ADD_ITEM", payload: product })
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  return (
    <Card className="group overflow-hidden p-0 shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden ">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        {!product.inStock && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            Esgotado
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold line-clamp-2 hover:underline">{product.name}</h3>
          </Link>

          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          <p className="text-2xl font-bold">R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} disabled={!product.inStock} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
        </Button>
      </CardFooter>
    </Card>
  )
}
