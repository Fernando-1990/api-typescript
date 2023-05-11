import supertest from 'supertest';
import { app } from '../src/server/server';
import { Knex } from '../src/database/knex';
import 'dotenv/config';


interface Shared {
    accessToken: string
}

beforeAll(async () => {
    
    await Knex.migrate.latest();
    await Knex.seed.run();
    const email = 'teste@gmail.com';
    await testServer.post('/cadaster').send({ nome:'Teste',sobrenome:'Teste', email, password: '1234567'});
    
    const signInRes = await testServer.post('/login').send({ email, password: '1234567'});
    shared.accessToken = signInRes.body.accessToken;

});

afterAll(async () => {
    await Knex.destroy();
});

export const testServer = supertest(app);

export const shared = {} as Shared;