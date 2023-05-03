import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { userProvider } from '../../database/providers/user';


type IBodyProps = Omit<IUser, 'id'>

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required().min(5),
        nome: yup.string().required().min(2),
        sobrenome: yup.string().required().min(2),
        password: yup.string().required().min(3),
    }))
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await userProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    
    return res.status(StatusCodes.CREATED).json(result);


    
};