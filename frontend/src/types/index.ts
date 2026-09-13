export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    discount_price?: string;
    final_price: string;
    image: string | null;
    size: string;
    color: string;
    stock: number;
    is_available: boolean;
    category: Category;
    created_at?: string;
}