import {IUser, User} from "./User";

export interface ITransaction {
  getSender(): string;
  getRecipient(): string;
  getAmount(): number;
}

export class Transaction implements ITransaction {
  private readonly sender: string;
  private readonly recipient: string;
  private readonly amount: number;

  constructor (sender: string, recipient: string, amount: number) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
  }

  getSender() {
    return this.sender;
  }

  getRecipient() {
    return this.recipient;
  }

  getAmount() {
    return this.amount;
  }
}
