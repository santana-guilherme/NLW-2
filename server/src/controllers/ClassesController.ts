import { Request, Response, response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {

  index = async (request: Request, response: Response) => {
    const filters = request.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes.'
      })
    }

    const subject = filters.subject as string;
    const week_day = Number(filters.week_day);
    const time = filters.time as string;

    var { page = 1, limit = 10 } = request.query
    page = Number(page) > 0 ? Number(page): 1
    limit = Number(limit)

    const timeInMinutes = convertHourToMinutes(time);
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
          .whereRaw('class_schedule.week_day = ??', [week_day])
          .whereRaw('class_schedule.from <= ??', [timeInMinutes])
          .whereRaw('class_schedule.to > ??', [timeInMinutes])
      }).limit(limit).offset( (page-1)*limit )
      .where('classes.subject', '=', subject)
      .join('teachers', 'classes.teacher_id', '=', 'teachers.id')
      .join('users', 'teachers.user_id', '=', 'users.id')
      .select(['teachers.*', 'users.*','classes.*'])

      for(let cls of classes) {
        cls.schedules = await this.getClassSchedules(cls.id)
      }

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
      const user_id = request.user?.id
      const teacher = await tsx('teachers').where({ user_id }).first();
      
      var teacher_id = 0
      if (teacher === undefined) {
        const insertedTeachersIds = await tsx('teachers').insert({
          user_id,
          whatsapp,
          bio
        }).returning('id');
        teacher_id = insertedTeachersIds[0]
      } else {
        teacher_id = teacher.id
      }

      const insertedClassesIds = await tsx('classes').insert({
        subject,
        cost,
        teacher_id
      }).returning('id');

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

  async getClassSchedules(class_id: number) {
    const schedules = await db('class_schedule').where({class_id: class_id})
    return schedules
  }

  
}