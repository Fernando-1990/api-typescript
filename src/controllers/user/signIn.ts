import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { userProvider } from '../../database/providers/user';
import { JWTService, passwordCrypto } from '../../services';


type IBodyProps = Omit<IUser, 'id' | 'nome' | 'sobrenome'>

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required().min(5),
        password: yup.string().required().min(3),
    }))
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { email, password } = req.body;
    const user = await userProvider.getByEmail(email);

    if (user instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email or password invalid'
            }
        });
    }
    const passwordMatch = await passwordCrypto.verifyPassword(password, user.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email or password invalid'
            }
        });
    } else {
        const accessToken = JWTService.sign({uid: user.id });
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Access token generating error'
                }
            });
        }


        return res.status(StatusCodes.OK).json({ accessToken });

    }   
};