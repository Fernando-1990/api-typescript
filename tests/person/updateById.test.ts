import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/person')
            .send({ email: 'exemple@gmail.com',
                nome: 'Fernando',
                sobrenome: 'Ferreira',
                cidadeId: 1 });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/person/${res1.body}`)
            .send({ email: 'exemple@gmail.com',
                nome: 'Felipe',
                sobrenome: 'Ferreira',
                cidadeId: 1 });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/person/99999')
            .send({ email: 'exemple@gmail.com',
                nome: 'Felipe',
                sobrenome: 'Ferreira',
                cidadeId: 1 });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});