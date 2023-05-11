import { StatusCodes } from 'http-status-codes';
import { testServer, shared } from '../jest.setup';


describe('Cities - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cities/${res1.body}`)
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ nome: 'Caxias' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/cities/99999')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ nome: 'Caxias' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});