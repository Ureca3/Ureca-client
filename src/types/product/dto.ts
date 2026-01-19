export interface CategoryProps {
  category_id: number;
  code: string;
  name: string;
  is_plan: boolean;
  is_monthly: boolean;
}
export interface ProductProps {
  product_id: number;
  desc: string | null;
  name: string;
  category: string;
  content: string | null;
  link: string;
  is_sale: boolean;
  price: number;
  img: string;
}
