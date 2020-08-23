import api from '../services/api';

export interface ClassesInterface {
  id?: number;
  subject: string;
  cost: string;
  teacher_id?: number;
  schedules: {
    id?: number
    week_day: string;
    from: number | string;
    to: number | string;
    class_id?: number;
  }[];
}

export interface TeacherInfoInterface {
  whatsapp: string;
  bio: string;
  subject: string;
  classes: ClassesInterface[]
}

export async function getAllTeacherInfo(): Promise<TeacherInfoInterface | false> {
  const response = await api.get('/all-teacher-info')
  if(response.status === 200)
    return response.data
  else
    return false
}