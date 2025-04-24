import { Favor } from "./favor";

export interface Transaction {
    id: number;
    transaction_type: 'EARN' | 'SPEND' | 'RETURN';
    amount: number;
    date_created: string;
    user: number;
    favor: Favor;
}