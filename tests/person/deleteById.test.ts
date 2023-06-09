import { StatusCodes } from 'http-status-codes';
import { testServer, shared } from '../jest.setup';


describe('Pessoas - DeleteById', () => {

    it('Apaga registro', async () => {

        const res1 = await testServer
            .post('/person')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ email: 'exemple@gmail.com',
                nome: 'Fernando',
                sobrenome: 'Ferreira',
                cidadeId: 1 });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/person/${res1.body}`)
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta apagar registro que não existe', async () => {

        const res2 = await testServer
            .delete('/person/99999')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send();

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });
});
