import { Request, Response } from 'express';
import db from '../database/connection';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export default class UsersController {

  async create(req: Request, res: Response) {
    const { email, password, name, last_name, avatar } = req.body

    const users = await db('users').where('users.email', '=', email)
    if (users.length > 0) {
      res.status(400).json({ error: 'Email already in use' })
    }

    const randomSalt = Math.ceil(Math.random() * 10)
    const passwordHash = await hash(password, randomSalt)

    await db('users').insert({
      email,
      password: passwordHash,
      name,
      last_name,
      avatar,
    })

    res.status(201).json({ message: 'User successfully created' })
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const users = await db('users').where('users.email', '=', email)
    if (users.length === 0) {
      res.status(400).json({ error: 'User don\'t exits' })
    }

    const isPasswordCorrect = await compare(password, users[0].password)
    if (isPasswordCorrect) {
      const jwt = sign({ id: users[0].id }, 'secret', { expiresIn: "1 days" })

      return res.json({
        user: users[0],
        token: jwt
      })

    } else {
      res.status(400).json({ error: 'Incorrect password' })
    }
  }
}