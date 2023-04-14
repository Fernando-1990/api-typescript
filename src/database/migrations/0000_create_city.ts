import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable(ETableNames.city, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome', 150).notNullable();

            table.comment('table used to store cities.');

        }).then(() => {console.log(`# Table ${ETableNames.city} created.`);});
}


export async function down(knex: Knex): Promise<void> {
    return knex
        .schema
        .dropTable(ETableNames.city).then(() => {console.log(`Table ${ETableNames.city} dropped`);});

}

