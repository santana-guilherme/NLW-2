import { hash, compare } from 'bcrypt';

export async function hashPassword(password: string) {
  const randomSalt = Math.ceil(Math.random() * 10)
  return await hash(password, randomSalt)
}