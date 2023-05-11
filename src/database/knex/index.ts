import knex from 'knex';
import { development, test, prod } from './Environment';
import pg from 'pg';
import 'dotenv/config';


if (process.env.NODE_ENV === 'prod') {
    pg.types.setTypeParser(20, 'text', parseInt);
}

const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case 'prod': return prod;
        case 'test': return test;
        default: return development;
    }
};



export const Knex = knex(getEnvironment());