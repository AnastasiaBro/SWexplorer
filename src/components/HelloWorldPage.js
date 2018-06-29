//import React, { Component } from 'react';
import React, { Component, PropTypes } from 'react';
import Apphome from './Apphome';
import App from './App';
import AppLogin from './App/AppLogin';
import Directors from './Directors';
import MapComponent from './MapComponent';
import Header from './Header';
import ElementCard from './ElementCard';
import Review from './Review';
import Footer from './Footer'
import ReactDOM from 'react-dom';
import index from './index';
import Login from './Login';
//import { store } from './_helpers';
import { BrowserRouter, ReactRouterDOM, Switch, Route } from 'react-router-dom';

/*const {
  HashRouter,
  Switch,
  Route,
  Link
} = ReactRouterDOM*/

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Apphome}/>
      <Route path='/films' component={App}/>
      <Route path='/directors' component={Directors}/>
      <Route path='/map' component={MapComponent}/>
      <Route path='/logout' component={Login}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

let userLogin = JSON.parse(localStorage.getItem('user'));
const header = document.querySelector('#header');
if (userLogin !== null) {
    header.querySelector('.home-page__title').classList.remove('visually-hidden');
    header.querySelector('.home-page__text--blue').innerHTML = userLogin.firstName + "!";
    header.querySelector('.home-page__logout').innerHTML = "Logout";
    header.querySelector('.home-page__logout').href = "/login";
} else {
    header.querySelector('.home-page__title').classList.add('visually-hidden');
    //header.querySelector('.home-page__text--blue').innerHTML = window.welcomeName + "!";
    header.querySelector('.home-page__logout').innerHTML = "Login";
    header.querySelector('.home-page__logout').href = "/logout";
}

class HelloWorldPage extends Component {
  render() {
    return (
        <div>
            <Header/>
            <Main/>
        </div>
    );
  }
}

export default HelloWorldPage;