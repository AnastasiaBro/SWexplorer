import React from 'react';
//import ReactDOM from 'react-dom';
//import {render} from 'react-dom';
import './App.css';

class Footer extends React.Component {
    render() {
        return (
          <div className='page-footer'>
            <div className='page-footer__container'>
              <div className='page-footer__left-block'>
                <a className='page-footer__link' href="https://swapi.co/">Swapi</a>
                <p className='page-footer__text'>The Star Wars API is the world's first quantified and programmatically-formatted set of Star Wars data.</p>
              </div>

              <div className='page-footer__center-block'>
                <div className='page-footer__image-container'>
                  <img className='page-footer__image' src='http://localhost:7070/senate_logo.png' alt='logo'></img>
                  <p className='page-footer__logo-name'>Galactic Senate</p>
                </div>
                <div className='page-footer__image-container'>
                  <img className='page-footer__image' src='http://localhost:7070/sith_logo.png' alt='logo'></img>
                  <p className='page-footer__logo-name'>Sith Empire</p>
                </div>
                <div className='page-footer__image-container'>
                  <img className='page-footer__image' src='http://localhost:7070/jedi_logo.png' alt='logo'></img>
                  <p className='page-footer__logo-name'>Jedi Order</p>
                </div>
                <div className='page-footer__image-container'>
                  <img className='page-footer__image' src='http://localhost:7070/imperia_logo.png' alt='logo'></img>
                  <p className='page-footer__logo-name'>Galactic Empire</p>
                </div>
                <div className='page-footer__image-container'>
                  <img className='page-footer__image' src='http://localhost:7070/old-rep__logo.png' alt='logo'></img>
                  <p className='page-footer__logo-name'>Old Galactic Republic</p>
                </div>
              </div>

              <div className='page-footer__right-block'>
                <a className='page-footer__link' href="https://github.com/AnastasiaBro/SWexplorer"><span>Github</span></a>
                <p className='page-footer__text'>The repository of this project is located on github.</p>
              </div>
            </div>
          </div>
        )
      }
}

export default Footer
