const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const WS = require('ws');
const chat = require('./db/chat');
const users = require('./db/users');

const app = new Koa();

app.use(cors('Access-Control-Allow-Origin', '*'));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(router());

const server = http.createServer(app.callback());
const port = process.env.PORT || 7000;

const wsServer = new WS.Server({
  server
});

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    const chatMessage = JSON.parse(message);
    chatMessage.nickname = users.getNickname(chatMessage.id);
    chat.push(chatMessage);

    const eventData = JSON.stringify({ chat: [chatMessage] });

    Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(eventData));
  });

    ws.send(JSON.stringify({ chat }));
});

server.listen(port, (err) => {
  if (err) {
    return console.log('Error occured:', err)
  }
  console.log(`server is listening on ${port}`)
});
