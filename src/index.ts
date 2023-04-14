import 'dotenv/config';
import { app } from './server/server';


app.listen(process.env.PORT, () => {
    console.log(`Server: online through port: ${process.env.PORT}`);
});