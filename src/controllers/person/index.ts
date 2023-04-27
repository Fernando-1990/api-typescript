import * as create from './create';
import * as getAll from './getAll';
import * as deleteById from './deleteById';
import * as getById from './getById';
import * as updateById from './updateById';



export const personController = {
    ...create,
    ...getAll,
    ...deleteById,
    ...getById,
    ...updateById,
};