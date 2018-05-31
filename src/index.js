import React from 'react'
import {render} from 'react-dom'
import Header from './components/Header'
//import App from './components/App'
import Apphome from './components/Apphome'
import Footer from './components/Footer'
import ReactDOM from 'react-dom';

render(<Header/>, document.getElementById('header'));
//render(<App/>, document.getElementById('root'));
render(<Apphome/>, document.getElementById('root'));
render(<Footer/>, document.getElementById('footer'));