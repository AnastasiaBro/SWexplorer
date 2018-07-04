//import React, { Component } from 'react';
import React, { Component, PropTypes } from 'react';
import App from './App';
import Header from './Header';
import ElementCard from './ElementCard';
import Review from './Review';
import Footer from './Footer'
import ReactDOM from 'react-dom';

//const propTypes = {
//    children: PropTypes.node  
//};

class FilmPage extends Component {
  render() {
    return (
        <div>
       
            <App/>
            <Footer/>
        </div>
    );
  }
}

//App.propTypes = propTypes;

export default FilmPage;