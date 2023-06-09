import { StatusCodes } from 'http-status-codes';
import { testServer, shared } from '../jest.setup';



describe('Pessoas - Create', () => {

    it('Cria registro', async () => {
  
        const res1 = await testServer
            .post('/person')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ email: 'exemple@gmail.com',
                nome: 'Fernando',
                sobrenome: 'Ferreira',
                cidadeId: 1 });
  
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Tenta criar um registro com nome muito curto', async () => {
  
        const res1 = await testServer
            .post('/person')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ email: 'exemple@gmail.com',
                nome: 'Fe',
                sobrenome: 'Ferreira',
                cidadeId: 1 });
  
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});