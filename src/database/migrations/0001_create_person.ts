import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex): Promise<void> {
    return knex
        .schema
        .createTable(ETableNames.person, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome').notNullable();
            table.string('sobrenome').notNullable();
            table.string('email').unique().notNullable();

            table.bigInteger('cidadeId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.city)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.comment('table used to store cities.');

        }).then(() => {console.log(`# Table ${ETableNames.person} created.`);});
}


export async function down(knex: Knex): Promise<void> {
    return knex
        .schema
        .dropTable(ETableNames.person).then(() => {console.log(`Table ${ETableNames.person} dropped`);});

}

