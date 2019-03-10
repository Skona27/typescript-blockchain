import express = require('express');
import {IndexRouter} from "./routes";

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use('/', IndexRouter);

app.listen(port, () => {
  console.log('App listening on port 3000!');
});