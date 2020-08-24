import { Response } from 'express'
import { verify } from 'jsonwebtoken';

export function verifyToken(req: any, res: Response, next: any) {
  const token = req.headers.authorization?.split(' ')[1]
  if(token === undefined)
    return res.status(400).json({error: 'Missing Token'})
  verify(token, process.env.TOKEN_SECRET as string, (err: any, user:any) => {
    if(err){
      console.log('ERROR: ', err)
      return res.status(400).json({err})
    }
    req.user = user
    next()
  })
}