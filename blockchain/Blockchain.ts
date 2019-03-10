import {Block, IBlock} from "./Block";
import {IUser, User} from "./User";
import {ITransaction, Transaction} from "./Transaction";

export interface IBlockchain {
  getData(): IBlock[];
  verify(): boolean;
  mineBlock(data: ITransaction): this;
  getLastBlock(): IBlock;
  getBalance(user: IUser): number;
  addTransaction(transaction: ITransaction): this;
}

export class Blockchain implements IBlockchain {
  private readonly chain: Block[] = [];
  private pendingTransactions: Transaction[] = [];
  private readonly difficulty: number;

  constructor(difficulty: number = 4) {
    this.chain.push(Blockchain.createGenesisBlock());
    this.difficulty = difficulty;
  }

  private static createGenesisBlock() {
    return new Block([],'0');
  };

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  };

  mineBlock() {
    const previousHash = this.getLastBlock().getHash();
    const block = new Block(this.pendingTransactions, previousHash);

    block.mine(this.difficulty);
    this.chain.push(block);

    this.pendingTransactions = [];

    return this;
  }

  addTransaction(transaction: Transaction) {
    if (transaction.isAmountOnBalance())
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
        if (user === transaction.getSender())
          balance -= transaction.getAmount();

        if (user === transaction.getRecipient())
          balance += transaction.getAmount();
      }
    }

    user.setBalance(balance);
    return balance;
  }
}
