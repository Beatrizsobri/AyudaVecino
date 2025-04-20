import { Favor } from "./favor";

export interface Transaction {
    id: number;
    transaction_type: 'EARN' | 'SPEND';
    amount: number;
    date_created: string;
    user: number;
    favor: Favor;
}