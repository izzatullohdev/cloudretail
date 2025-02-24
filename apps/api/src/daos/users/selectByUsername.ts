import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const selectByUsername = async (
  client: DbClient,
  { username }: { username: string },
) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`select * from users where username = ${username}`,
    ),
  );
};
