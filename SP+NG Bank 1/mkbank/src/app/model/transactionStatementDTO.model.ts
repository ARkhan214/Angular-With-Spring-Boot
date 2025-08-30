export class TransactionDTO {
    id?: number;
    accountHolderName?: string;
    receiverAccountId?: number | null;
    receiverAccountName?: string | null;
    type?: string; // DEBIT or CREDIT
    transactionType?: string;
    amount?: number;
    transactionTime?: string; // ISO string
    description?: string;
    // New fields for bill payment
    companyName?: string;            // Bill company (DESCO, TITAS, etc.)
    accountHolderBillingId?: string; // Customer billing reference
}