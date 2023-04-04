import express from 'express';

const app = express();

app.get('/',(_, res) => {
    res.send({message: 'Hello world!!!'});
});


export { app };

