import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken'
import { getUserIdFromToken } from '../utils/auth'

import db from '../database/connection';

export default class TeachersController {
  async teacherInfo(req: Request, res: Response) {
    //get all teacher information based on user_id
    const user_id = getUserIdFromToken(req.headers.authorization)
    if (user_id === "") {
      return res.status(400).json({
        error: 'Missing token'
      })
    }

    try {

      const teacher = await db('teachers').where({ user_id }).first()

      const classes = await db('classes')
        .where({ teacher_id: teacher.id })

      var schedules: object[] = []
      for (let cls of classes) {
        schedules.push(
          await db('class_schedule')
            .where({ class_id: cls.id })
        )
        cls.schedules = schedules
      }

      teacher.classes = classes;

      res.status(200).json(teacher)


    } catch (err) {
      console.log('ERROR: ', err)
      return res.status(400).json({
        error: `An error has occured ${err}`
      })
    }

  }
}