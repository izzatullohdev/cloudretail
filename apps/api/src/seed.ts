import crypto from 'crypto';
import { DbClient } from './pool';
import * as userDao from './daos/users';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants';
import { NoRecordsFound } from './exaptions';
export const seed = async (client: DbClient) => {
  try {
    await userDao.selectByUsername(client, { username: ADMIN_USERNAME });
  } catch (error) {
    if (error instanceof NoRecordsFound) {
      await userDao.createUser(client, {
        username: ADMIN_USERNAME,
        password: crypto
          .createHash('sha256')
          .update(ADMIN_PASSWORD)
          .digest('hex'),
      });
      console.info('Admin user created');
    }
    console.info('Send complate');
  }
};
