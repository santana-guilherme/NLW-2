import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import TeachersController from './controllers/TeachersControllers';
import { verifyToken } from './utils/verifyToken';
import FavoritesController from './controllers/FavoritesController';


const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const teachersController = new TeachersController();
const favoritesController = new FavoritesController();

//TODO: add middleware for token verification
routes.post('/classes',verifyToken, classesController.create);
routes.get('/classes',verifyToken, classesController.index);
routes.post('/connections', verifyToken,connectionsController.create);
routes.get('/connections',verifyToken, connectionsController.index);
routes.post('/register', usersController.create);
routes.post('/login', usersController.login);
routes.post('/forgot-password', usersController.forgotPassword);
routes.post('/reset-password', usersController.resetPassword);
routes.put('/update-user', verifyToken,usersController.update);
routes.get('/all-teacher-info',verifyToken, teachersController.allTeacherInfo);
routes.get('/teacher-info', verifyToken,teachersController.getTeacherInfo);
routes.put('/update-teacher',verifyToken, teachersController.update);
routes.get('/get-schedules', classesController.getClassSchedules);
routes.post('/favorite-teacher',verifyToken, favoritesController.create);
routes.get('/favorite-teachers',verifyToken, favoritesController.index);
routes.post('/remove-favorite-teacher',verifyToken, favoritesController.remove);

export default routes;