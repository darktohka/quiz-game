import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('quiz')
    .addColumn('id', 'varchar(21)', (col) => col.primaryKey().notNull())
    .addColumn('data', 'blob', (col) => col.notNull())
    .addColumn('createdAt', 'datetime', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('user').execute();
}

export default {
  up,
  down,
};
