import {IUser, User} from "./User";

export interface ITransaction {
  getSender(): IUser;
  getRecipient(): IUser;
  getAmount(): number;
  isAmountOnBalance(): boolean;
}

export class Transaction implements ITransaction {
  private readonly sender: User;
  private readonly recipient: User;
  private readonly amount: number;

  constructor (sender: User, recipient: User, amount: number) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;

    if (!this.isAmountOnBalance())
      console.log(`Insufficient funds on ${sender.getName()}'s balance: ${sender.getBalance()}.\nCannot send ${this.amount} to ${recipient.getName()}.\n`);
  }

  isAmountOnBalance() {
    return this.sender.getBalance() >= this.amount;
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
