export interface IUser {
  getBalance(): number;
  getName(): string;
  isAmountOnBalance(amount: number): boolean;
}

export class User implements IUser {
  private readonly name: string;
  private balance: number;

  constructor (name: string, balance: number = 0) {
    this.name = name;
    this. balance = balance;
  }

  getName() {
    return this.name;
  }

  getBalance() {
    return this.balance;
  }

  isAmountOnBalance(amount: number) {
    return this.balance >= amount;
  }
}
