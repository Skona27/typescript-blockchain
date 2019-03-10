import {Block, IBlock} from "./Block";
import {IUser, User} from "./User";
import {ITransaction, Transaction} from "./Transaction";

export interface IBlockchain {
  getData(): IBlock[];
  verify(): boolean;
  getLastBlock(): IBlock;
  getBalance(user: IUser): number;
  addTransaction(transaction: ITransaction): this;
}

export class Blockchain implements IBlockchain {
  private readonly chain: Block[] = [];
  private pendingTransactions: Transaction[] = [];
  private readonly difficulty: number;
  private readonly updateTime: number;

  constructor(difficulty: number = 4, updateTime: number = 5) {
    this.chain.push(Blockchain.createGenesisBlock());
    this.difficulty = difficulty;
    this.updateTime = updateTime;

    setInterval(() => this.mineBlock(), this.updateTime * 1000);
  }

  private static createGenesisBlock() {
    return new Block([],'0');
  };

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  };

  private mineBlock() {
    if (this.pendingTransactions.length)  {
      const previousHash = this.getLastBlock().getHash();
      const block = new Block(this.pendingTransactions, previousHash);

      block.mine(this.difficulty);
      this.chain.push(block);

      this.pendingTransactions = [];
    }
  }

  addTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);

    return this;
  }

  verify() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.getHash() !== currentBlock.calculateHash())
        return false;

      if (currentBlock.getPreviousHash() !== previousBlock.getHash())
        return false;
    }

    return true;
  }

  getData() {
    return this.chain;
  }

  getBalance(user: User) {
    let balance = user.getBalance();

    for (const block of this.chain) {
      for (const transaction of block.getTransactions()) {
        if (user.getName() === transaction.getSender())
          balance -= transaction.getAmount();

        if (user.getName() === transaction.getRecipient())
          balance += transaction.getAmount();
      }
    }

    return balance;
  }
}
