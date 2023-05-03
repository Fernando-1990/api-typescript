import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { userProvider } from '../../database/providers/user';
import { IParamProps } from '../../shared/types';
import { IUser } from '../../database/models';

type IBodyProps = Omit<IUser, 'id' | 'nome' | 'sobrenome' | 'password'>

export const getByEmailValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required().min(5)
    }))
}));

export const getByEmail = async (req: Request<IParamProps>, res: Response) => {
    if (!req.body.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            
            errors: {
                default: 'user email must be informed.'
            }
        });
    }
    const result = await userProvider.getByEmail(req.body.email);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }


    return res.status(StatusCodes.OK).json(result);
};
