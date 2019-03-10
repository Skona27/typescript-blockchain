import express from "express";
import bodyParser from "body-parser";

import {Request, Response} from "express";
import {User} from "./blockchain/User";
import {Transaction} from "./blockchain/Transaction";
import {Blockchain} from "./blockchain/Blockchain";

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const blockchain: Blockchain = new Blockchain(2, 1);
const users: User[] = [];

app.get('/', (req: Request, res: Response) => {
  res.json(blockchain.getData());
});

app.post('/user', (req: Request, res: Response) => {
  const {name, balance} = req.body;

  if (!users.some(user => user.getName() === name))
    users.push(new User(name, balance));

  res.json({name, balance});
});

app.post('/transaction', (req: Request, res: Response) => {
  const {sender, recipient, amount} = req.body;

  const senderUser = users.find(user => user.getName() === sender);
  const recipientUser = users.find(user => user.getName() === recipient);

  if (senderUser && recipientUser) {
    const transaction = new Transaction(senderUser, recipientUser, amount);
    blockchain.addTransaction(transaction);
  }

  res.json({text: 'Pending...'});
});

app.listen(port, () => {
  console.log('App listening on port 3000!');
});