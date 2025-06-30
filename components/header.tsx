"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useRef, useEffect } from "react"

export function Header() {
  const { state } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchBlur = () => {
    // Pequeno delay para permitir cliques em elementos relacionados à busca
    setTimeout(() => {
      setIsSearchOpen(false)
    }, 150)
  }

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 p-4 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl">EcommerceUI</span>
          </Link>
        </div>

        {/* Navegação e Busca - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Início
            </Link>
            <Link href="/products" className="transition-colors hover:text-foreground/80">
              Produtos
            </Link>
            <Link href="/categories" className="transition-colors hover:text-foreground/80">
              Categorias
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              Sobre
            </Link>
          </nav>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Buscar produtos..." 
              className="pl-8 w-[200px] xl:w-[300px]" 
            />
          </div>
        </div>

        {/* Navegação e Busca - Tablet (md-lg) */}
        <div className="hidden md:flex lg:hidden items-center flex-1 justify-center mx-4">
          {!isSearchOpen ? (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80">
                Início
              </Link>
              <Link href="/products" className="transition-colors hover:text-foreground/80">
                Produtos
              </Link>
              <Link href="/categories" className="transition-colors hover:text-foreground/80">
                Categorias
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80">
                Sobre
              </Link>
            </nav>
          ) : (
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8 w-full"
                onBlur={handleSearchBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsSearchOpen(false)
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-6 w-6"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Ações do usuário */}
        <div className="flex items-center gap-2">
          {/* Botão de busca - apenas em tablet */}
          {!isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex lg:hidden"
              onClick={handleSearchToggle}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Botão de usuário */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>

          {/* Carrinho */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {state.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6 px-4">
                <Link href="/" className="text-lg font-medium">
                  Início
                </Link>
                <Link href="/products" className="text-lg font-medium">
                  Produtos
                </Link>
                <Link href="/categories" className="text-lg font-medium">
                  Categorias
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  Sobre
                </Link>
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar produtos..." className="pl-8 w-full" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Minha Conta
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
