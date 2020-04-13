import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch ,Route,Link} from 'react-router-dom';

 import User from "./components/user";
 import UsersList from "./components/userList";
 import AddUser from "./components/addUser.js";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-info">
          <a href="/" className="navbar-brand">
            Home
          </a>
          <div className="navbar-nav mr-auto">
           
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add New User
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UsersList} />
            <Route exact path="/home" component={UsersList} />
            <Route exact path="/add" component={AddUser} />
            <Route path="/users/:id" component={User} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;