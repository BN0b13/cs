import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from "http";
import { Server } from "socket.io";

import routes from './routes/index.js';

import Cron from './services/Cron.js';

import { domainName } from './config.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cron = new Cron();

cron.backup();
cron.handleScheduledGiveaways();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
);

// Prod
// app.use(cors({
//   origin: [`https://${domainName}`, `https://www.${domainName}`, `https://admin.${domainName}`]
// }));

// Dev
// app.use(cors({
//   origin: [`https://dev.${domainName}`, `https://dev.admin.${domainName}`]
// }));


// Local
// app.use(cors({
//   origin: ['http://localhost:5050', 'http://localhost:3000' ]
// }));

app.use(cors({ origin: '*' }));

app.disable('x-powered-by');

const httpServer = createServer(app);

const io = new Server(httpServer, {
  
});

io.on('connection', (socket) => {
  socket.emit('connect', {message: 'a new client connected'});
});

app.use('/', routes);

httpServer.listen(port, () => console.log(`Backend listening on port ${port}.`));