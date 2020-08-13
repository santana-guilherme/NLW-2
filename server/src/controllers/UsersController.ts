import e, { Request, Response } from 'express';
import db from '../database/connection';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';
import mailer from '../modules/mail';

export default class UsersController {

  async create(req: Request, res: Response) {
    const { email, password, name, last_name, avatar } = req.body

    const users = await db('users').where('users.email', '=', email)
    if (users.length > 0) {
      return res.status(400).json({ error: 'Email already in use' })
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

    res.status(201).json({ message: 'User successfully created' }).send()
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await db('users').where('users.email', '=', email).first()
    if (!user) {
      return res.status(400).json({ error: 'User don\'t exits' })
    }

    const isPasswordCorrect = await compare(password, user.password)
    if (isPasswordCorrect) {
      const jwt = sign({ id: user.id }, 'secret', { expiresIn: "1 days" })

      return res.status(200).json({
        user,
        token: jwt
      })

    } else {
      res.status(400).json({ error: 'Incorrect password' })
    }
  }

  async forgotPassword(req: Request, res: Response) {
    //verificar se o email existe em algum usuário
    const { email } = req.body;
    try {
      const user = await db('users').where('users.email', '=', email).first()
      if (!user)
        return res.status(400).json({
          error: "No user found with that email :-("
        });

      // cria um token com validade de uma hora
      const resetPasswordToken = crypto.randomBytes(20).toString('hex');
      const date = new Date()
      const tokenExpirationTime = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
      tokenExpirationTime.setHours(tokenExpirationTime.getHours() - 3 + 1) //+1h
      // Adiciona o token a tabela de usuário
      await db('users').where({ id: user.id }).update({
        resetPasswordToken,
        resetPasswordTokenExpires: tokenExpirationTime
      })

      const updatedUser = await db('users').where({ id: user.id }).first()

      //mandar e email
      const mailOptions = {
        to: email,
        from: 'fictional@email.com',
        template: 'auth/forgot_password',
        context: {
          username: user.name,
          token: resetPasswordToken
        }
      }

      mailer.sendMail(mailOptions, (err) => {
        if(err) {
          console.log(err)
          return res.status(500).json({
            error: 'Could not send forgot password email :-('
          })
        }
        res.status(200).send({message: 'Reset password email was send ;-)'})
      })
    } catch (err) {
      console.log('Error', err);
      return res.status(400).json({
        error: err
      })
    }
    //mandar alguma coisa com para o email do usuário
  }
}