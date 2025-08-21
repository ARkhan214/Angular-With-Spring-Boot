import { Accounts } from "./accounts.model";
import { FdStatus } from "./fdStatus";

export class FixedDeposit{

  id?: number;
  account!: Accounts;
  depositAmount!: number;
  durationInMonths!: number;
  interestRate!: number;
  prematureInterestRate!: number;
  startDate!: Date;
  maturityDate!: Date;
  maturityAmount!: number;
  prematureWithdrawalDate?: Date | null;
  status!: FdStatus;
  fDLustUpdatedAt!: Date;
}

