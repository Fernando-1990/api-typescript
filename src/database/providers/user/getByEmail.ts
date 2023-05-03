import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';


export const getByEmail = async (email: string): Promise<IUser | Error> => {
    try {
        const result = await Knex(ETableNames.user)
            .select('*')
            .where('email', '=', email)
            .first();            
        if ( result) return result;
        
        return new Error('No such record found');  

    } catch (error) {
        console.log(error);
        Knex.destroy();
        return Error('Error registering');


    }
};