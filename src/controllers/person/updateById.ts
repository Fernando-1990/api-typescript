import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IPerson } from '../../database/models';
import { personProvider } from '../../database/providers/person';
import { IParamProps } from '../../shared/types';


type IBodyProps = Omit<IPerson, 'id'>

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
        nome: yup.string().required().min(3),
        sobrenome: yup.string().required().min(3),
        cidadeId: yup.number().integer().required().min(1)
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));

export const updateById = async (req: Request<IParamProps, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            
            errors: {
                default: 'id param must be informed.'
            }
        });
    }

    const result = await personProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};
