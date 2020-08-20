import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken'
import { getUserIdFromToken } from '../utils/auth'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import Knex from 'knex';

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
          ...(await db('class_schedule')
            .where({ class_id: cls.id }))
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

  async update(req: Request, res: Response) {
    const user_id = getUserIdFromToken(req.headers.authorization)
    if (user_id === '') {
      return res.status(400).json({
        error: 'Missing token'
      })
    }

    //const db = await db.transaction()

    try {
      const { whatsapp, bio, classes } = req.body
      const teacher = await db('teachers').where({ user_id }).first()

      var response = await db('teachers').where({ id: teacher.id }).update({
        whatsapp,
        bio
      });

      if (response === 0) {
        return res.status(400).json({
          error: 'Error while trying to update teacher'
        })
      }


      classes.map(async (cls: any) => {
        await db('classes').update({
          cost: cls.cost,
          subject: cls.subject
        }).where({ id: cls.id })

        await cls.schedules.map(async (schedule: any) => {
          await db('class_schedule').delete().where({class_id: cls.id})
          await db('class_schedule').insert({
            week_day: schedule.week_day,
            from: convertHourToMinutes(schedule.from),
            to: convertHourToMinutes(schedule.to),
            class_id: cls.id
          })
        })
      })

      //await db.commit();
      res.status(204).send()
    } catch (err) {
      console.log('ERROR', err)
      return res.status(400)

    }
  }
}