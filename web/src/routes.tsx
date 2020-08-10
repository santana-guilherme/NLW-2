import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute';


function Routes() {
  return(
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <PrivateRoute exact path='/home' component={Home}/>
    </BrowserRouter>
  );
}

export default Routes;