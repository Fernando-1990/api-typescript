import { StatusCodes } from 'http-status-codes';
import { testServer, shared } from '../jest.setup';



describe('Cidades - Create', () => {
          

    it('Cria registro', async () => {
  
        const res1 = await testServer
            .post('/cities')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ nome: 'São Paulo' });
  
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Tenta criar um registro com nome muito curto', async () => {
  
        const res1 = await testServer
            .post('/cities')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ nome: 'Ca' });
  
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});