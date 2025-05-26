import { Generated, Kysely, Migrator } from 'kysely';
import { Database } from 'bun:sqlite';
import { BunSqliteDialect } from 'kysely-bun-sqlite';
import createUserTable from './migrations/create-user-table';
import createQuizTable from './migrations/create-quiz-table';

export type UserTable = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Generated<string>;
};

export type QuizTable = {
  id: string;
  data: Uint8Array;
  createdAt: Generated<string>;
};

export type KyselyDatabase = {
  user: UserTable;
  quiz: QuizTable;
};

export const db = new Kysely<KyselyDatabase>({
  dialect: new BunSqliteDialect({
    database: new Database('db.sqlite'),
  }),
});

export const migrateToLatest = async () => {
  const migrator = new Migrator({
    db,
    provider: {
      getMigrations: () =>
        Promise.resolve({
          '1-create-user-table': createUserTable,
          '2-create-quiz-table': createQuizTable,
        }),
    },
  });

  const { error, results } = await migrator.migrateToLatest();

  for (const it of results ?? []) {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  }

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }
};
