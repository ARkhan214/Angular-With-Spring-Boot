import { Accounts } from "./accounts.model";

export class Transaction {

    id?:number;
    type!: 'DEPOSIT' | 'WITHDRAW' | 'FIXED_DEPOSIT' | 'TRANSFER' | 'RECEIVE';
    amount !: number;
    transactionTime !: Date;
    description?: string;
    accountId !: number;
    receiverAccountId ?: number;

    

}