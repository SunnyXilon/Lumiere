export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Clarifying Cleansing Gel",
    subtitle: "200ml | 6.7 fl oz",
    price: 34,
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Bestseller"
  },
  {
    id: "2",
    name: "Radiance Vitamin C Serum",
    subtitle: "30ml | 1.0 fl oz",
    price: 58,
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Deep Hydration Cream",
    subtitle: "50ml | 1.7 oz",
    price: 48,
    image: "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "New"
  },
  {
    id: "4",
    name: "Botanical Toner",
    subtitle: "150ml | 5.0 fl oz",
    price: 28,
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];
