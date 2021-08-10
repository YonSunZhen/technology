import { demoDao } from '../demo';

export async function initDb() {
  await demoDao.ensure();
}