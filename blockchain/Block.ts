import {SHA256} from 'crypto-js';
import {ITransaction, Transaction} from "./Transaction";

export interface IBlock {
  calculateHash(): string;
  getHash(): string;
  getPreviousHash(): string;
  mine(difficulty: number): void;
  getTransactions(): ITransaction[];
}

export class Block implements IBlock {
  private readonly previousHash: string;
  private readonly timestamp: number;
  private readonly transactions: Transaction[];
  private hash: string;
  private nonce: number;

  constructor (transactions: any, previousHash: string) {
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + this.transactions + this.nonce).toString();
  };

  getHash() {
    return this.hash;
  };

  getPreviousHash() {
    return this.previousHash;
  };

  mine(difficulty: number) {
    while (this.hash.substring(0, difficulty)  !== Array(difficulty + 1).join("0") ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  getTransactions() {
    return this.transactions;
  }
}
