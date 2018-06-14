import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import App from './App';
import Apphome from './Apphome';
import ElementCard from './ElementCard';
import Review from './Review';
import './App.css';

class Header extends React.Component {
    render() {
        return (
            <div className="page-header__container">
              <nav className="main-nav main-nav--opened">
              <button className="main-nav__toggle" type="button">
                <span className="visually-hidden">Close</span>
              </button>
              <ul className="main-nav__list">
                <li className="main-nav__item main-nav__item--active">
                  <a className="main-nav__link main-nav__link--active" onClick={this.homeClick}>Home</a>
                </li>
                <li className="main-nav__item">
                  <a className="main-nav__link" href="#" onClick={this.filmsClick}>Films</a>
                </li>
                <li className="main-nav__item">
                  <a className="main-nav__link" href="#">Where am I?</a>
                </li>
              </ul>
              <label className="main-nav__search">
                <input className="main-nav__input" type="text" placeholder="Search"></input>
              </label>
            </nav>
          </div>
        )
    }

    homeClick = (e) => {
        render(<Apphome/>, document.getElementById('root'));
        render(<ElementCard name={'Luke Skywalker'} variant={'people'} />, document.getElementById('element'));
        render(<Review/>, document.getElementById('reviews'));
        document.querySelector('.body-style').classList.remove('bg-films');
        document.querySelectorAll('.main-nav__item')[0].classList.add('main-nav__item--active');
        document.querySelectorAll('.main-nav__link')[0].classList.add('main-nav__link--active');
        document.querySelectorAll('.main-nav__item')[1].classList.remove('main-nav__item--active');
        document.querySelectorAll('.main-nav__link')[1].classList.remove('main-nav__link--active');
        document.querySelector('#element').style = 'min-height: 400px; margin-top: 60px; margin-bottom: 80px;';
    }

    filmsClick = (e) => {
        render(<App/>, document.getElementById('root'));
        ReactDOM.unmountComponentAtNode(document.getElementById('element'));
        ReactDOM.unmountComponentAtNode(document.getElementById('reviews'));
        document.querySelector('.body-style').classList.add('bg-films');
        document.querySelectorAll('.main-nav__item')[1].classList.add('main-nav__item--active');
        document.querySelectorAll('.main-nav__link')[1].classList.add('main-nav__link--active');
        document.querySelectorAll('.main-nav__item')[0].classList.remove('main-nav__item--active');
        document.querySelectorAll('.main-nav__link')[0].classList.remove('main-nav__link--active');
        document.querySelector('#element').style = 'min-height: 0px; margin-top: 0px; margin-bottom: 0px;';
    }
      
}

export default Header
