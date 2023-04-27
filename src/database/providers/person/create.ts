import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';


export const create = async (person: Omit<IPerson, 'id'>): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.city)
            .where('id', '=', person.cidadeId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('city not found');
        }
    

        const [result] = await Knex(ETableNames.person).insert(person).returning('id');

        if(typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }


        return new Error('Error registering');

    } catch (error) {
        console.log(error);
        return Error('Error registering');

    }
};