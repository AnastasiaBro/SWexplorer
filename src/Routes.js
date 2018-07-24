import React from 'react';
//import { IndexRoute, Route }  from 'react-router';
//import App from 'components/App';
//import Apphome from 'components/Apphome';
import HelloWorldPage from './components/HelloWorldPage';
//import FilmPage from 'components/FilmPage';
//import TimePage from 'components/TimePage';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
//import configureStore from './store/configureStore.js';

class Routes extends React.Component {
 render() {
     return(
        <BrowserRouter>
          <HelloWorldPage />
        </BrowserRouter>
    )
  }
}
export default Routes;