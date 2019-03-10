export interface IUser {
  getBalance(): number;
  setBalance(balance: number): this;
  getName(): string;
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

  setBalance(balance: number) {
    this.balance = balance;
    return this;
  }
}
