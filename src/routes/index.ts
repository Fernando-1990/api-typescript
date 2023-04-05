import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/',(_, res) => {
    return res.send({message: 'Hello world!!!'});
});                           


router.post('/teste', (req, res) => {
    return res.status(StatusCodes.OK).json(req.body);
});

export { router };