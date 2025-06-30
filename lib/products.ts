export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone Pro Max",
    price: 1299.99,
    image: "/images/celular.png",
    description:
      "O mais avançado smartphone com câmera profissional, processador de última geração e bateria de longa duração.",
    category: "Eletrônicos",
    rating: 4.8,
    reviews: 324,
    inStock: true,
  },
  {
    id: "2",
    name: "Notebook Gaming Elite",
    price: 2499.99,
    image: "/images/notebook.png",
    description: "Notebook gamer com placa de vídeo dedicada, 16GB RAM e SSD de 1TB para máxima performance.",
    category: "Computadores",
    rating: 4.9,
    reviews: 156,
    inStock: true,
  },
  {
    id: "3",
    name: "Fones Wireless Premium",
    price: 299.99,
    image: "/images/fones.png",
    description: "Fones de ouvido sem fio com cancelamento de ruído ativo e qualidade de som excepcional.",
    category: "Áudio",
    rating: 4.7,
    reviews: 892,
    inStock: true,
  },
  {
    id: "4",
    name: 'Smart TV 4K 55"',
    price: 1899.99,
    image: "/images/smartv.png",
    description: "Smart TV 4K com HDR, sistema operacional inteligente e conectividade completa.",
    category: "TV & Vídeo",
    rating: 4.6,
    reviews: 234,
    inStock: false,
  },
  {
    id: "5",
    name: "Câmera Digital Profissional",
    price: 3299.99,
    image: "/images/camera.png",
    description: "Câmera DSLR profissional com sensor full-frame e lente 24-70mm incluída.",
    category: "Fotografia",
    rating: 4.9,
    reviews: 78,
    inStock: true,
  },
  {
    id: "6",
    name: 'Tablet Pro 12.9"',
    price: 1099.99,
    image: "/images/tablet.png",
    description: "Tablet profissional com tela Retina, suporte à Apple Pencil e teclado magnético.",
    category: "Tablets",
    rating: 4.8,
    reviews: 445,
    inStock: true,
  },
  {
    id: "7",
    name: "Relógio Inteligente Sport",
    price: 499.99,
    image: "/images/relogio.png",
    description: "Relógio inteligente com monitoramento de atividades, batimentos cardíacos e GPS integrado.",
    category: "Wearables",
    rating: 4.5,
    reviews: 210,
    inStock: true,
  },
  {
    id: "8",
    name: "Console de Videogame Next Gen",
    price: 2999.99,
    image: "/images/console.png",
    description: "Console de videogame de última geração com suporte a jogos em 4K e VR.",
    category: "Games",
    rating: 4.8,
    reviews: 512,
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}
