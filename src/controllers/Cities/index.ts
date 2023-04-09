import * as create from './createCities';
import * as getAll from './getAll';



export const CitiesController = {
    ...create, ...getAll,
};