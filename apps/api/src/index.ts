import pgMigrate from 'node-pg-migrate';
import {
  DATABASE_URL,
  HTTP_PORT,
  MIGRATIONS_DIR,
  MIGRATIONS_TABLE,
} from './constants';
import { seed } from './seed';
import { pool } from './pool';
import { app } from './app';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    dir: MIGRATIONS_DIR,
    direction: 'up',
    migrationsTable: MIGRATIONS_TABLE,
  });
  await seed(pool);
  app.listen(HTTP_PORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('Server is running on http://localhost:' + HTTP_PORT);
  });
})().catch(console.error);
