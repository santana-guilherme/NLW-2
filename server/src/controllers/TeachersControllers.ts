import { Request, Response, response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

export default class TeachersController {

  allTeacherInfo = async (req: Request, res: Response) => {
    //get all teacher information based on user_id
    const teacher = await this.getTeacher(req.user)
    if (teacher.error)
      return res.status(400).json(teacher)

    try {
      const classes = await db('classes')
        .where({ teacher_id: teacher.id })

      for (let cls of classes) {
        var schedules: object[] = []
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

  getTeacher = async (user: any) => {
    try {
      var teacher = await db('teachers').where({ user_id: user.id }).first()
      if (teacher === undefined) {
        return { error: 'User is not a teacher' }
      }

      return teacher;
    } catch (err) {
      console.log("ERROR: ", err)
    }
  }

  getTeacherInfo = async (req: Request, res: Response) => {
    try {
      const teacher = await this.getTeacher(req?.user)
      if (teacher.error !== undefined){
        return res.status(400).json(teacher)
      }

      res.status(200).json(teacher)
    } catch(err) {
      console.log('ERROR', err)
    }
    
  }

  update = async (req: Request, res: Response) => {
    //const db = await db.transaction()

    try {
      const { whatsapp, bio, classes } = req.body
      const teacher = await this.getTeacher(req.user)

      if (teacher.error !== undefined) {
        return res.status(400).json(teacher)
      }

      var response = await db('teachers').where({ id: teacher.id }).update({
        whatsapp,
        bio
      },['id']);

      if (response.length === 0) {
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
            }).returning('id');
            schedule.id = res[0]
          }
        })
        await this.removeRemainingSchedules(cls)
        await this.removeClassesWithoutSchedules(cls)
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

  async removeClassesWithoutSchedules(cls: any) {
    const schedules = cls.schedules.length
    if (schedules === 0) {
      console.log("Class without schedules", JSON.stringify(cls))
      await db('classes').delete().where({ id: cls.id })
    }
  }


}