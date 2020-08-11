import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute';
import CompleteRegister from './pages/CompleteRegister';


function Routes() {
  return(
    <BrowserRouter>
      <PrivateRoute exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/register-success" component={CompleteRegister} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;