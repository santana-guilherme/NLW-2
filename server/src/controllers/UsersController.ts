import { Request, Response } from 'express';
import db from '../database/connection';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config()

import { hashPassword, getUserIdFromToken } from '../utils/auth';
import mailer from '../modules/mail';

export default class UsersController {

  async create(req: Request, res: Response) {
    const { email, password, name, last_name, avatar } = req.body
    var users = []
    try{
      users = await db('users').where({email})

    }catch(err) {
      console.log(err)
      return res.status(400)
    }

    if (users.length > 0) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    const passwordHash = await hashPassword(password)

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
      const jwt = sign({ id: user.id }, process.env.TOKEN_SECRET as string, { expiresIn: "1 days" })

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
        return res.status(500).json({
          error: "No user found with that email :-("
        });

      if (user.resetPasswordToken && new Date(user.tokenExpirationTime) > new Date()) {
        return res.status(500).json({
          error: "This user already requested a password reset"
        });
      } //else: token is already expired, let user create another

      // cria um token com validade de uma hora
      const resetPasswordToken = crypto.randomBytes(20).toString('hex');
      const date = new Date()
      const tokenExpirationTime = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
      tokenExpirationTime.setHours(tokenExpirationTime.getHours() + 1) //+1h
      // Adiciona o token a tabela de usuário
      await db('users').where({ id: user.id }).update({
        resetPasswordToken,
        resetPasswordTokenExpires: tokenExpirationTime
      })

      //mandar e email
      const mailOptions = {
        to: email,
        from: 'fictional@email.com',
        template: 'auth/forgot_password',
        context: {
          username: user.name,
          link: `http://localhost:3000/reset-password/${resetPasswordToken}`
        }
      }

      mailer.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            error: 'Could not send forgot password email :-('
          })
        }
        res.status(200).send({ message: 'Reset password email was send ;-)' })
      })
    } catch (err) {
      console.log('Error', err);
      return res.status(400).json({
        error: err
      })
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body

    try {
      let user = await db('users').where({ resetPasswordToken: token }).first()//fix

      if (!user) {
        return res.status(400).json({
          error: 'Invalid token'
        })
      }

      if (new Date(user.resetPasswordTokenExpires) < new Date()) {
        return res.status(400).json({
          error: 'Token has expired'
        })
      }


      const newPasswordHash = await hashPassword(newPassword)

      await db('users').where({ id: user.id }).update({
        password: newPasswordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpires: null
      })

      res.status(200).json({
        message: 'Password successfully reset'
      }).send()

    } catch (err) {
      console.log('EXCEPTION ERROR: ', err)
      return res.status(501).json({
        error: `An erro has occurred\n${err}`
      })
    }
  }

  async update(req: Request, res: Response) {
    const user_id = getUserIdFromToken(req.headers.authorization)
    if (user_id === '') {
      return res.status(400).json({
        error: 'Missing token'
      })
    }

    try {
      const { name, last_name, avatar } = req.body
      const response = await db('users').where({ id: user_id }).update({
        name,
        last_name,
        avatar
      },['id'])

      if (response.length > 0) {
        res.status(204).send()
      } else {
        console.log('User Not updated', response);
        return res.status(400).json({error: 'User not updated'})
      }

    } catch (err) {
      console.log('ERROR: ', err)
    }
  }
}