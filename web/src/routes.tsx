import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';


function Routes() {
  return(
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <PrivateRoute path='/home' component={Home}/>
      <Route path="/login" component={Login} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;