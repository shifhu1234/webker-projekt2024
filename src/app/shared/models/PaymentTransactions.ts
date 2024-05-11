export interface PaymentTransactions {
    id: string;
    address: string;
    date: Date;
    totalPrice: number;
    user_id?: string;
}
