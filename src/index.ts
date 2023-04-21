import 'dotenv/config';
import { app } from './server/server';
import { Knex } from './database/knex';


const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server: online through port: ${process.env.PORT}`);
    });
};


if (process.env.IS_LOCALHOST !== 'true') {
    console.log('Running migrations');

    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed.run()
                .then(() => (startServer()))
                .catch(console.log);
        })
        .catch(console.log);
} else {
    startServer();
}