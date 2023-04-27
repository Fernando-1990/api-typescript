import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';


export const updateById = async (id: number, person: Omit<IPerson, 'id'>): Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.city)
            .where('id', '=', person.cidadeId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('city not found');
        }
        
        const result = await Knex(ETableNames.person)
            .update(person)
            .where('id', '=', id);
        if (result > 0) return;

        return new Error('Error to upadate register');
    } catch (error) {
        console.log(error);
        return new Error('Error to update register');
    }
};