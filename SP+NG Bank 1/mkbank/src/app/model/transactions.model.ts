import { Accounts } from "./accounts.model";
import { TransactionType } from "./transactionType.model";

export class Transaction {

    id?:number;
    type!:TransactionType;
    amount !: number;
    transactionTime !: Date;
    description?: string;
    accountId !: number;
    receiverAccountId ?: number;
 }