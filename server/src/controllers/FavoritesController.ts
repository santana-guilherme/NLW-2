import { Request, Response } from 'express';
import db from '../database/connection';

export default class FavoritesController {

  async index(req: Request, res: Response) {
    try {

      const user_id = req.user?.id
      let favorites_teachers_ids = []
      favorites_teachers_ids = await db.from('favorites').select('teacher_id').where({ user_id })
  
      if (favorites_teachers_ids.length === 0) {
        res.status(200).json([])
        return
      }
  
      favorites_teachers_ids = favorites_teachers_ids.map(x => x.teacher_id)
  
      const teachers = await db.from('teachers')
        .whereIn('teachers.id', favorites_teachers_ids)
        .join('users', { 'teachers.user_id': 'users.id' })
        .select(['users.*', 'teachers.*'])
  
      for (let teacher of teachers) {
        teacher.teacher_id = teacher.id
        teacher.classes = await db('classes').where({ 'teacher_id': teacher.id })
      }
      res.status(200).json(teachers)
      return
    } catch(err) {
      console.log('ERROR', err)
    }

  }

  async create(req: Request, res: Response) {
    const user_id = req.user?.id
    const { teacher_id } = req.body

    const inserted_rows = await db('favorites').insert({ user_id, teacher_id }).returning('id')
    if (inserted_rows.length === 1) {
      res.status(201).send()
    } else {
      return res.status(400).json({ 'error': 'Error while adding favorite teacher' })
    }
  }

  async remove(req: Request, res: Response) {
    const user_id = req.user?.id
    const { teacher_id } = req.body

    const deletedIds = await db('favorites').delete().where({ user_id, teacher_id }).returning('id')
    if (deletedIds.length !== 1) {
      return res.status(400).json({ 'error': 'Error while removing favorite teacher' })
    }
    res.status(204).send()
  }
}