import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable(ETableNames.user, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome').notNullable().checkLength('>', 3);
            table.string('email').index().unique().notNullable().checkLength('>', 5);
            table.string('senha').notNullable().checkLength('>', 6);

            table.comment('table used to store users.');

        }).then(() => {console.log(`# Table ${ETableNames.user} created.`);});
}


export async function down(knex: Knex): Promise<void> {
    return knex
        .schema
        .dropTable(ETableNames.user).then(() => {console.log(`Table ${ETableNames.user} dropped`);});

}

