export interface Transaction {
    id: string;
    items: {
        itemId: string;
        itemAmount: string;
    }
    totalPrice: number;
    time: string;
}
