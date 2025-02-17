import pg from 'pg';
import { DATABASE_URL } from './constants';
import { MultipleRecordsFound, NoRecordsFound } from './exaptions';
export type DbClient = pg.Pool | pg.PoolClient | pg.Client;
export const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

export const getRows = async <T>(promise: Promise<{ rows: T[] }>) => {
  const { rows } = await promise;
  return rows;
};

export const getRow = async <T>(
  promise: Promise<{ rows: T[] }>,
  strict = true,
): Promise<T | undefined> => {
  const rows = await getRows(promise); // rows o'z-o'zidan T[] bo'ladi

  if (strict) {
    if (rows.length === 0) {
      throw new NoRecordsFound();
    }
    if (rows.length > 1) {
      throw new MultipleRecordsFound();
    }
  }

  return rows[0] ?? undefined;
};
