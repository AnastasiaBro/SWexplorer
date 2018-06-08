import React from 'react'
import {render} from 'react-dom'
//import Header from './components/Header'
import App from './components/App'
import Apphome from './components/Apphome'
//import SearchField from './components/SearchField'
import ElementCard from './components/ElementCard'
import Footer from './components/Footer'
import ReactDOM from 'react-dom';

document.querySelector('.body-style').classList.remove('bg-films');
document.querySelectorAll('.main-nav__item')[0].classList.add('main-nav__item--active');
document.querySelectorAll('.main-nav__link')[0].classList.add('main-nav__link--active');
document.querySelectorAll('.main-nav__item')[1].classList.remove('main-nav__item--active');
document.querySelectorAll('.main-nav__link')[1].classList.remove('main-nav__link--active');

//render(<Header/>, document.getElementById('header'));
render(<Apphome/>, document.getElementById('root'));
//render(<SearchField/>, document.getElementById('search-field'));
render(<ElementCard name={'Luke Skywalker'} variant={'people'} />, document.getElementById('element'));
render(<Footer/>, document.getElementById('footer'));