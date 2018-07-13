import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import UserForm from './UserForm.js';
import GetComments from './GetComments.js';
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
