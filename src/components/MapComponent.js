import React from 'react';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import Header from './Header';

//import ReactDOM from 'react-dom';
//import {render} from 'react-dom';

//import { userActions } from './_actions';


class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderMap () {
      
        if (document.querySelector('.main-nav__item--active')) {
            document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
            document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
            document.querySelectorAll('.main-nav__item')[3].classList.add('main-nav__item--active');
            document.querySelectorAll('.main-nav__link')[3].classList.add('main-nav__link--active');
          }

          window.onload = function () {
            if (document.querySelector('.main-nav__item--active')) {
                document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
                document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
                document.querySelectorAll('.main-nav__item')[3].classList.add('main-nav__item--active');
                document.querySelectorAll('.main-nav__link')[3].classList.add('main-nav__link--active');
            }
        }
      //let userLogin = JSON.parse(localStorage.getItem('user'));
      let userLogin = JSON.parse(localStorage.getItem('user'));
        //window.onload = function() {
        if (userLogin === null) {
            return (
                <div className="map">
                    <div className="home-page__container">
                        <h3 className="home-page__title visually-hidden">Welcome, <span className="home-page__text--blue"></span></h3>
                        <Link className="home-page__logout" onClick={this.onLoginClick} to='/login'>Login</Link>
                    </div>
                    <div className="map__container">
                      <h3 className="map__title">Pages:</h3>
                      <div className="map__block">
                          <div className="map__block-page">
                              <p className="map__page">Home</p>
                              <ul className="map__list">
                                  <li className="map__item">Information about Star Wars, SWexplorer, SWAPI</li>
                                  <li className="map__item">Search area</li>
                                  <li className="map__item">Comments area</li>
                              </ul>
                          </div>
      
                          <div className="map__block-page">
                              <p className="map__page">Films</p>
                              <ul className="map__list">
                                  <li className="map__item">Information about 7 films</li>
                                  <li className="map__item">Search film</li>
                              </ul>
                          </div>
      
                          <div className="map__block-page">
                              <p className="map__page">Directors</p>
                              <ul className="map__list">
                                  <li className="map__item">Information about directors</li>
                                  <li className="map__item">To add, delete or edit information <Link className="home-page__logout map__button" onClick={this.onLoginClick} to='/login'>Login</Link></li>
                              </ul>
                          </div>
                      </div>
                        
                    </div>
                </div>
                
              );
        
        } 

      

        else if (userLogin !== null) {
            return (
                <div className="map">
                    <div className="home-page__container">
                        <h3 className="home-page__title">Welcome, <span className="home-page__text--blue">{userLogin.firstName}!</span></h3>
                        <Link className="home-page__logout" onClick={this.onLogoutClick} to='/login'>Logout</Link>
                    </div>
                    <div className="map__container">
                      <h3 className="map__title">Pages:</h3>
                      <div className="map__block">
                          <div className="map__block-page">
                              <p className="map__page">Home</p>
                              <ul className="map__list">
                                  <li className="map__item">Information about Star Wars, SWexplorer, SWAPI</li>
                                  <li className="map__item">Search area</li>
                                  <li className="map__item">Comments area</li>
                              </ul>
                          </div>
      
                          <div className="map__block-page">
                              <p className="map__page">Films</p>
                              <ul className="map__list">
                                  <li className="map__item">Information about 7 films</li>
                                  <li className="map__item">Search film</li>
                              </ul>
                          </div>
      
                          <div className="map__block-page">
                              <p className="map__page">Directors</p>
                              <ul className="map__list">
                                  <li className="map__item">Information about directors</li>
                                  <li className="map__item">To add, delete or edit information <Link className="home-page__logout map__button" onClick={this.onLoginClick} to='/logout'>Login</Link></li>
                              </ul>
                          </div>
                      </div>
                        
                    </div>
                </div>
                
              );
        //}
    }

    }

    onLoginClick = (e) => {
        
        window.location.reload(true);
    }

    onLogoutClick = (e) => {
        localStorage.setItem("token", "null");
        document.cookie = "token=; path=/; expires=;";
        window.location.reload(true);
    }

    render() {
        
        return (
          <div>
            {this.renderMap()}
          </div>
        )
        
    }
}



export default MapComponent;