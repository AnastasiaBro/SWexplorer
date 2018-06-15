import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import UserForm from './UserForm.js';
import GetComments from './GetComments.js';
import './App.css';

class Review extends React.Component {
    render() {
        return (
          <div className='review__container'>
              <div className='review__left-block'>
                <div className='review__block review__text-title'>
                    <p className='review__text'><span className='review__title'>Comment area</span></p>
                </div>
                <div className='review__block'>
                    <UserForm />
                </div>
              </div>
              <div className='review__right-block'>
                <div className='review__block'>
                    <p className='review__text'><span className='review__name'>Obi-Wan</span></p>
                    <p className='review__text'><span className='review__comment'>These aren't the droids you're looking for.</span></p>
                </div>

                <div className='review__block'>
                    <p className='review__text'><span className='review__name'>Anonymous</span></p>
                    <p className='review__text'><span className='review__comment'>May the Force be with you.</span></p>
                </div>

                <GetComments/>
              </div>         
          </div>
        )
      }
}

export default Review
