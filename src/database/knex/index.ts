import knex from 'knex';
import { development, test, prod } from './Environment';


const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case 'prod': return prod;
        case 'test': return test;
        default: return development;
    }
};



export const Knex = knex(getEnvironment());