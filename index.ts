import { HTTPServer } from './src/http_server/index';

const server = new HTTPServer(8181);

// interface Player {
//   name: string;
//   password: string;
// }

// interface PlayersDB {
//   [index: string]: Player;
// }

// let playersDB: PlayersDB = {};

// // Create a websocket server
// const wss = new Server({ noServer: true });

// wss.on('connection', (ws) => {
//   ws.on('message', (message: string) => {
//     const req = JSON.parse(message);
//     switch (req.type) {
//       case 'reg':
//         const { name, password } = req.data;
//         if (playersDB[name]) {
//           ws.send(
//             JSON.stringify({
//               type: 'reg',
//               data: { name, index: null, error: true, errorText: 'User already exists' },
//               id: req.id,
//             }),
//           );
//         } else {
//           playersDB[name] = { name, password };
//           const index: string = uuidv4();
//           ws.send(
//             JSON.stringify({
//               type: 'reg',
//               data: { name, index, error: false, errorText: '' },
//               id: req.id,
//             }),
//           );
//         }
//         break;
//       default:
//         ws.send(JSON.stringify({ error: true, errorText: 'Unknown request type' }));
//         break;
//     }
//   });
// });

// const HTTP_PORT: number = 8181;

// console.log(`Start static http server on the ${HTTP_PORT} port!`);
// HTTPServer.listen(HTTP_PORT);

// // Tie http server with websocket server
// HTTPServer.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });
