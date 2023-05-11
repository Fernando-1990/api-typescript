import { StatusCodes } from 'http-status-codes';
import { testServer, shared } from '../jest.setup';


describe('Cities - DeleteById', () => {

    it('Apaga registro', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cities/${res1.body}`)
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta apagar registro que não existe', async () => {

        const res2 = await testServer
            .delete('/cities/99999')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send();

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });
});
