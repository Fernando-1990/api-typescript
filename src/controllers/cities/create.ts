import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';
import { CitiesProvider } from '../../database/providers/cities';


type IBodyProps = Omit<ICity, 'id'>

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await CitiesProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    
    return res.status(StatusCodes.CREATED).json(result);


    
};