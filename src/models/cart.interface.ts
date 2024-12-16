interface ProductItem {
    product: string;
    qty: number;
}

export interface ICart {
    isDeleted?: boolean,
    quantity: Number,
    productId: ProductItem[],
    userId: string
}