import { Accounts } from "./accounts.model";

export class Transaction {

    id?:number;
    type!: 'Deposit' | 'Withdraw' | 'Fixed Deposit' | 'Transfer' | 'Receive';
    amount !: number;
    transactiontime !: Date;
    description?: string;
    accountId !: string;
    receiverAccountId ?: string;

    

}