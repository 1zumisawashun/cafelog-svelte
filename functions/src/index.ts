import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import * as express from 'express';
// const logActivities = require('./utilities/logger');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const app = express();

const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase! CI Re Deploy!');
});

app.get('/hello', (req: Request, res: Response) => {
  res.status(200).json({ message: 'hello world, api server' });
});

const api = functions.https.onRequest(app);

module.exports = { api, helloWorld };
