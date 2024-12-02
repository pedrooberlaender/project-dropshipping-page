export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  isPromotion?: boolean;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}
