import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Login', () => {

    it('Log in into system', async () => {

        const res1 = await testServer
            .post('/cadaster')
            .send({
                email: 'exemple@gmail.com',
                nome: 'Fernando',
                sobrenome: 'Ferreira',
                password: '1234567'
            });
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer
            .post('/login')
            .send({
                email: 'exemple@gmail.com',
                password: '1234567'
            });
        
        expect(res2.statusCode).toEqual(StatusCodes.OK);
        expect(res2.body).toHaveProperty('accessToken', 'teste.teste.teste');



    });
} );