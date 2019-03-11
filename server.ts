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

const blockchain: Blockchain = new Blockchain(2, 10);
const users: User[] = [
  new User("Kuba", 1000),
  new User("Justyna", 1000)
];

app.get('/', (req: Request, res: Response) => {
  res.json(blockchain.getData());
});

app.post('/user', (req: Request, res: Response) => {
  const {name, balance} = req.body;
  let user;

  if (!users.some(user => user.getName() === name)) {
    user = new User(name, balance);
    users.push(user);
  } else {
    user = users.find(user => user.getName() === name);
  }

  res.json(user);
});

app.post('/transaction', (req: Request, res: Response) => {
  const {sender, recipient, amount} = req.body;

  const senderUser = users.find(user => user.getName() === sender);
  const recipientUser = users.find(user => user.getName() === recipient);

  if (senderUser && recipientUser) {
    const transaction = new Transaction(sender, recipient, amount);
    const balance = blockchain.getBalance(senderUser);

    if (balance >= amount) {
      blockchain.addTransaction(transaction);
      res.json({text: 'Transaction pending...'});
    } else
        res.json({text: 'Insufficient funds on account.'});
  } else {
    res.json({text: 'Invalid data.'});
  }
});

app.get('/user/:username', (req: Request, res: Response) => {
  const user = users.find(user => user.getName() === req.params.username);

  if (!user)
    res.json("No user.");
  else {
    const balance = blockchain.getBalance(user);
    res.json({...user, balance });
  }
});

app.listen(port, () => {
  console.log('App listening on port 3000!');
});