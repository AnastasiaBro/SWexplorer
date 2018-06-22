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
                <div>
                    <UserForm />
                </div>
              </div>
              <div className='review__right-block' id="reviews-comments">

                <GetComments link={0} />
                <div className = 'review__container-page' id='review__container-page'></div>
                <button className="review__button" type="button" onClick={this.onReviewButtonClick}>Show next comments</button>
              </div>
          </div>
        )
      }

      onReviewButtonClick () {
        //render(<GetComments link={1} />, document.getElementById('review__container-page'));
      }
}

export default Review
