import { HTTPServer } from './src/http_server/index';
import dotenv from 'dotenv';

dotenv.config();
const port = Number(process.env.HTTP_PORT) || 8181;
new HTTPServer(port);