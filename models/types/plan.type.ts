export type Plan = {
    end_date: Date;
    start_date: Date;
    product: Product;
}   

export type Product = {
    id: number;
    maxMessages: number;
    planType: string;
    product_id: number;
}