import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import App from './App';
import Apphome from './Apphome';
import ElementCard from './ElementCard';
import Review from './Review';
import './App.css';
import { Link } from 'react-router-dom';


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
                  <Link className="main-nav__link main-nav__link--active" onClick={this.homeClick} to='/'>Home</Link>{/*<a className="main-nav__link main-nav__link--active" onClick={this.homeClick}>Home</a>*/}
                </li>
                <li className="main-nav__item">
                  <Link className="main-nav__link" onClick={this.filmsClick} to='/films'>Films</Link>{/*<a className="main-nav__link" href="#" onClick={this.filmsClick}>Films</a>*/}
                </li>
                <li className="main-nav__item">
                  <Link className="main-nav__link" onClick={this.directorsClick} to='/directors'>Directors</Link>{/*<a className="main-nav__link" href="#" onClick={this.directorsClick}>Directors</a>*/}
                </li>
                <li className="main-nav__item">
                  <Link className="main-nav__link" onClick={this.mapClick} to='/map'>Map</Link>
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
        //render(<Apphome/>, document.getElementById('root'));
        //render(<ElementCard name={'Luke Skywalker'} variant={'people'} />, document.getElementById('element'));
        //render(<Review/>, document.getElementById('reviews'));
        document.querySelector('.body-style').classList.remove('bg-films');
        /*document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
        document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
        document.querySelectorAll('.main-nav__item')[0].classList.add('main-nav__item--active');
        document.querySelectorAll('.main-nav__link')[0].classList.add('main-nav__link--active');*/
        //document.querySelector('#element').style = 'min-height: 400px; margin-top: 60px; margin-bottom: 80px;';
    }

    filmsClick = (e) => {
        //render(<App/>, document.getElementById('root'));
        //ReactDOM.unmountComponentAtNode(document.getElementById('element'));
        //ReactDOM.unmountComponentAtNode(document.getElementById('reviews'));
        //document.querySelector('.body-style').classList.add('bg-films');
        /*document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
        document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
        document.querySelectorAll('.main-nav__item')[1].classList.add('main-nav__item--active');
        document.querySelectorAll('.main-nav__link')[1].classList.add('main-nav__link--active');*/
        //document.querySelector('#element').style = 'min-height: 0px; margin-top: 0px; margin-bottom: 0px;';
    }

    directorsClick = (e) => {
        //ReactDOM.unmountComponentAtNode(document.getElementById('root'));
        //ReactDOM.unmountComponentAtNode(document.getElementById('element'));
        //ReactDOM.unmountComponentAtNode(document.getElementById('reviews'));
        document.querySelector('.body-style').classList.remove('bg-films');
        /*document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
        document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
        document.querySelectorAll('.main-nav__item')[2].classList.add('main-nav__item--active');
        document.querySelectorAll('.main-nav__link')[2].classList.add('main-nav__link--active');*/
        //document.querySelector('#element').style = 'min-height: 0px; margin-top: 0px; margin-bottom: 0px;';
    }

    mapClick = (e) => {
        document.querySelector('.body-style').classList.remove('bg-films');
    }
      
}

export default Header
