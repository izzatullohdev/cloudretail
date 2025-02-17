import { DbClient, getRow } from '../../pool';
import { sql } from '@ts-safeql/sql-tag';
export const createUser = async (
  client: DbClient,
  value: { username: string; password: string },
) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`
        insert into users (username, password) 
        values (${value.username}, ${value.password})
        returning *
    `,
    ),
  );
};
