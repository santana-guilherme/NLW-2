import { hash } from 'bcrypt';
import { decode } from 'jsonwebtoken';

export async function hashPassword(password: string) {
  const randomSalt = Math.ceil(Math.random() * 10)
  return await hash(password, randomSalt)
}


export function getUserIdFromToken(token: string| undefined): string {
  token = token ? token.split("Bearer")[1].trim() : ""
  if(token === "") {
    return ""
  }

  const decodedToken = decode(token) as any
  const user_id = decodedToken['id']
  return user_id
}