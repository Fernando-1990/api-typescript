import { Request, Response } from 'express';


interface ICity {
    nome: string;
}
export class City {
    create(req:Request<{}, {}, ICity>, res:Response) {
        const data = req.body;

        console.log(data);

        return res.json(data);

    } 
}