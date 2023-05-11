import { StatusCodes } from 'http-status-codes';
import { testServer, shared } from '../jest.setup';


describe('Cities - GetById', () => {

    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/cities/${res1.body}`)
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    });
    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
            .get('/cities/99999')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});