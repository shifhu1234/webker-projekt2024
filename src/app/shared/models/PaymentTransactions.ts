export interface PaymentTransactions {
    id: string;
    address: string;
    buyer_name: string;
    date: Date;
    totalPrice: number;
    user_id?: string;
}
