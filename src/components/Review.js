import React from 'react';
//import ReactDOM from 'react-dom';
//import {render} from 'react-dom';
//import UserForm from './UserForm.js';
import GetComments from './GetComments.js';
//import {render} from 'react-dom';
//import Search from './Search.js';
//import ElementCard from './ElementCard.js';
import './App.css';


class Review extends React.Component {
  
    render() {

        return (
          <div>
              
                <GetComments/>
                             
          </div>
        )
      }
      
}

export default Review
