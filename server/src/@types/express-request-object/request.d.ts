interface User {
  id: number,
  name: string,
  last_name: string,
  password: string,
  email: string,
  avatar?: string,
  resetPasswordToken?: string,
  resetPasswordTokenExpires?: string,
}

declare namespace Express {
  export interface Request {
    user?: User
  }
}