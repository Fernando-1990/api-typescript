import { StatusCodes } from 'http-status-codes';

import { testServer, shared } from '../jest.setup';


describe('Pessoas - GetAll', () => {

    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/Person')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send({ email: 'exemple@gmail.com',
                nome: 'Fernando',
                sobrenome: 'Ferreira',
                cidadeId: 1 });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/Person')
            .set({Authorization: `Bearer ${shared.accessToken}`})
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});