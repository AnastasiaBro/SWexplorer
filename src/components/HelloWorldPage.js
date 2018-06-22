//import React, { Component } from 'react';
import React, { Component, PropTypes } from 'react';
import Apphome from './Apphome';
import App from './App';
import Header from './Header';
import ElementCard from './ElementCard';
import Review from './Review';
import Footer from './Footer'
import ReactDOM from 'react-dom';
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
    </Switch>
  </main>
)

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