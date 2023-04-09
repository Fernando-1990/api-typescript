import express from 'express';
import { router } from '../routes';
import 'dotenv/config';
    

export class Server {
    static init() {
        const app = express();
        app.use(express.json());
        app.use(router);

        app.listen(process.env.PORT, () => {
            console.log(`Server: online through port: ${process.env.PORT}`);
        });
    }
}