import { Request, Response } from 'express';
import { getUserIdFromToken } from '../utils/auth'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

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

      var teacher = await db('teachers').where({ user_id }).first()
      if (teacher === undefined) {
        return res.status(400).json({
          error: 'User is not a teacher'
        })
      }
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

  update = async (req: Request, res: Response) => {
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

          if (schedule.id !== undefined) { //update existing schedule
            await db('class_schedule').update({
              week_day: schedule.week_day,
              from: convertHourToMinutes(schedule.from),
              to: convertHourToMinutes(schedule.to),
            }).where({ id: schedule.id })
          }
          else { // create new schedule
            const res = await db('class_schedule').insert({
              week_day: schedule.week_day,
              from: convertHourToMinutes(schedule.from),
              to: convertHourToMinutes(schedule.to),
              class_id: cls.id
            })
            schedule.id = res[0]
          }
        })
        await this.removeRemainingSchedules(cls)
      })
      res.status(204).send()
    } catch (err) {
      console.log('ERROR', err)
      return res.status(400)

    }
  }

  async removeRemainingSchedules(cls: any) {
    const allClasses = await db('class_schedule').where({ class_id: cls.id })
    const sendedSchedules: any[] = cls.schedules.map((x: any) => x.id)
    const idsToRemove = allClasses.filter(sch => !sendedSchedules.includes(sch.id)).map(x => x.id)
    await db('class_schedule').delete().where(builder => builder.whereIn('id', idsToRemove))
  }
}