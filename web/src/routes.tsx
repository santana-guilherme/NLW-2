import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import CompleteRegister from './pages/CompleteRegister';
import ForgotPassword from './pages/ForgotPassword';
import CompleteForgotPassword from './pages/CompleteForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CompleteResetPassword from './pages/CompleteResetPassword';
import Profile from './pages/Profile';


function Routes() {
  return(
    <BrowserRouter>
      <RestrictedRoute>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/register-success" component={CompleteRegister}/>
        <Route path="/forgot-password-complete" component={CompleteForgotPassword}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/complete-reset-password" component={CompleteResetPassword} />
      </RestrictedRoute>
      <PrivateRoute exact path="/" component={Landing} />
      <PrivateRoute path="/study" component={TeacherList} />
      <PrivateRoute path="/give-classes" component={TeacherForm} />
      <Route path='/profile' component={Profile}/>
    </BrowserRouter>
  );
}

export default Routes;