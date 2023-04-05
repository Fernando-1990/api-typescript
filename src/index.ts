import { app } from './server/server';
import 'dotenv/config';

app.listen(process.env.PORT, () => {
    console.log('Server: online');
});