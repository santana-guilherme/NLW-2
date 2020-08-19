import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import { getUserIdFromToken } from '../utils/auth'
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {

  async index(request: Request, response: Response) {
    const filters = request.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes.'
      })
    }

    const subject = filters.subject as string;
    const week_day = Number(filters.week_day);
    const time = filters.time as string;

    const timeInMinutes = convertHourToMinutes(time);
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [week_day])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return response.json(classes)
  }

  async create(request: Request, response: Response) {
    const {
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const tsx = await db.transaction();

    try {
      var user_id = getUserIdFromToken(request.headers.authorization)
      
      if (user_id === "") {
        return response.status(400).json({
          error: 'Missing token'
        })
      }

      const teachers = await db('teachers').where({ user_id });
      var teacher_id = 0;

      if (teachers.length > 0) {
        teacher_id = teachers[0].id
      } else {
        const insertedTeachersIds = await tsx('teachers').insert({
          user_id,
          whatsapp,
          bio
        });
        teacher_id = insertedTeachersIds[0];
      }

      const insertedClassesIds = await tsx('classes').insert({
        subject,
        cost,
        teacher_id
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      });

      await tsx('class_schedule').insert(classSchedule);

      await tsx.commit();
      response.status(201).send();

    } catch (err) {
      await tsx.rollback();

      console.log('error', err)
      return response.status(404).json({
        error: "Unexpected error while creating new class."
      })
    }
  }
}