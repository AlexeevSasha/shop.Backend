export type ProductT = {
  id: string
  title: string
  slug: string
  brand: string | null
  description: string
  price: number
  oldPrice: number
  quantity: number
  images: string[]
  sold: number
};
