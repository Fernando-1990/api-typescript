import { StatusCodes } from 'http-status-codes';
import { testServer, shared } from '../jest.setup';


describe('Login', () => {
    

    it('Log in into system', async () => {

        const res1 = await testServer
            .post('/cadaster')
            .send({
                email: 'teste@hotmail.com',
                nome: 'Andressa',
                sobrenome: 'Ferreira',
                password: '1234567'
            });
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer
            .post('/login')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({
                email: 'teste@hotmail.com',
                password: '1234567'
            });

        
        expect(res2.statusCode).toEqual(StatusCodes.OK);
        expect(res2.body).toHaveProperty('accessToken');
    



    });
} );