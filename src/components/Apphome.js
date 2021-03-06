import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import Search from './Search.js';
import ElementCard from './ElementCard.js';
import Review from './Review.js';
import { Link } from 'react-router-dom';
//import Header from './Header.js';
import './App.css';

//document.querySelector('.body-style').classList.remove('bg-films');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var checkLanguage = function (text) {
  if (/[a-z]/i.test(text)) {
    return text;
  }
}

const number = getRandomInt(0, 9);
const variant = getRandomInt(0, 7);
const citeRandom = getRandomInt(0, 5);

const WEATHER = ['http://localhost:7070/rain.gif', 'http://localhost:7070/snow.gif', 'http://localhost:7070/fog.gif', 'http://localhost:7070/sunny.gif', 'http://localhost:7070/rain.gif', 'http://localhost:7070/snow.gif', 'http://localhost:7070/fog.gif', 'http://localhost:7070/sunny.gif'];
const TEMP = ['+13°C', '-10°C', '+7°C', '+30°C', '+24°C', '-23°C', '+15°C', '+17°C'];
const ICONS = ['http://localhost:7070/rain-icon.png', 'http://localhost:7070/snow-icon.png', 'http://localhost:7070/fog-icon.png', 'http://localhost:7070/sun-icon.png', 'http://localhost:7070/rain-icon.png', 'http://localhost:7070/snow-icon.png', 'http://localhost:7070/fog-icon.png', 'http://localhost:7070/sun-icon.png'];
const URLS = ['https://swapi.co/api/planets','https://swapi.co/api/planets/?page=2'];
const DESCRIPTION = ['rain', 'snow', 'wind', 'sun', 'rain', 'snow', 'wind', 'sun'];

const GROUPS = {'people': 'Luke Skywalker', 'planets': 'Alderaan', 'vehicles': 'Sand Crawler', 'starships': 'Death Star', 'species': 'Toydarian', 'films': 'A New Hope'};

const CITES = ['You must unlearn, what you have learned.', 
'You will know the good from the bad when you are calm.', 
'In this matters, trust your insight we do. May the Force be with you.', 
'Truly wonderful, the mind of a child is.', 
'Fear is the path to the dark side… fear leads to anger… anger leads to hate… hate leads to suffering.', 
'Do. Or do not. There is no try.'];

const FILMS = ['The Empire Strikes Back', 'The Empire Strikes Back', 'Attack of the Clones', 'Attack of the Clones', 'The Phantom Menace', 'The Empire Strikes Back'];

class Apphome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      text: '',
      group: 'people'
    }
  }
  componentDidMount() {
    this._isMounted = true;
    const xhr = new XMLHttpRequest();
    const URL = URLS[getRandomInt(0, 1)];
    xhr.open('GET', URL, true);
    xhr.send();
    this.setState({ isLoading: true })

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return false
      }

      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText)
      } else {
        if (this._isMounted) {
          this.setState({
            data: JSON.parse(xhr.responseText),
            isLoading: false,
          })
        }
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderWeather() {
    const { data, isLoading } = this.state
    if (isLoading) {
      return <p className = 'first-text'>A long time ago in a galaxy far,<br></br> far away...</p> // рисуем прелоадер
    } else {
      if (data.results !== undefined && this._isMounted) { //проверка, что data.results загружен
          const results = [];  //данные
          
          
          //console.log(number);

          for (var i = 0; i < this.state.data.results.length; i++) {
              results[i] = this.state.data.results[i];
          }

          //console.log(this.state.group);
          //console.log(this.state.text);

          /*const listResults = results.map((results, index) =>
              <li className = 'film__item' key={index}>
                  <img className = 'film__image' src={'http://localhost:7070/' + results.title + '.jpg'} alt="film"></img>
                  <p className = 'film__item-text film__item-text--first'>{results.title}</p>
                  <h6 className = 'visually-hidden'>{index}</h6>
              </li>
          );*/

          /*class MainSearchPlugin extends React.Component{
             
            constructor(props){
                super(props);
                this.onFieldChanged = this.onFieldChanged.bind(this);
            }
                     
            onFieldChanged(e){
                const text = e.target.value.trim();   // удаляем пробелы
                //console.log(this.props.newName);
                this.setState({newName: e.target.value.trim()}); // передаем введенный текст в родительский компонент
                console.log(text);
            }
                     
            render() {
                return (
                 <div>
                    <label>
                      <input placeholder="Enter a name" id="input-main-search" onChange={this.onFieldChanged} />
                    </label>
                  </div>
                );
            }
          }*/
          if (document.querySelector('.main-nav__item--active')) {
            document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
            document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
            document.querySelectorAll('.main-nav__item')[0].classList.add('main-nav__item--active');
            document.querySelectorAll('.main-nav__link')[0].classList.add('main-nav__link--active');
          }

          let userLogin = JSON.parse(localStorage.getItem('user'));
          /*eslint no-useless-escape: 0*/
          //console.log(userLogin);
          //window.onload = function() {
          if (document.cookie === "" || document.cookie === "token=" || document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "") {
            
            localStorage.setItem('user', null);
            //let userLogin = JSON.parse(localStorage.getItem('user'));
            //console.log(userLogin);
          }

            if (document.cookie === "" || document.cookie === "token=" || document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "") {
            if (userLogin === null) {
          return (
          <div>
            <div className = 'description'>
              <div className="home-page__container home-page__container--apphome">
                  <h3 className="home-page__title visually-hidden">Welcome, <span className="home-page__text--blue"></span></h3>
                  <Link className="home-page__logout" onClick={this.onLoginClick} to='/login'>Login</Link>
              </div>
              <div className = 'description-third__container'>
                <h1 className = 'description-third__text description-third__text--first'>Star Wars</h1>
                <div className = 'description-third__blocks'>
                  <div className = 'description-third__left-block'>
                    <h2 className = 'description-third__title'>SWexplorer</h2>
                    <p className = 'description-third__left-block-text'>This application named Star Wars explorer is a set of web pages and scripts for visual display of the received data.</p>
                    <p className = 'description-third__left-block-text'>The data displayed in the application is obtained from the external freely available web service <a className = 'description-third__link description-third__link--light' href='https://swapi.co'>SWAPI</a>.</p>
                  </div>
                  <div className = 'description-third__central-block'>
                    <p className = 'description-third__central-block-text'>— is an American epic space opera media franchise, centered on a film series created by <a className = 'description-third__link' href='https://en.wikipedia.org/wiki/George_Lucas'>George Lucas</a>. It depicts the adventures of characters "a long time ago in a galaxy far, far away".</p>
                    <p className = 'description-third__central-block-text description-third__central-block-text--last'>The Star Wars franchise takes place in a distant unnamed fictional galaxy at an undetermined point in the ancient past, where many species of aliens (often humanoid) co-exist. People own robotic droids, who assist them in their daily routines, and space travel is common.</p>
                  </div>
                  <div className = 'description-third__right-block'>
                    <h2 className = 'description-third__title'>SWAPI</h2>
                    <p className = 'description-third__right-block-text'>The Star Wars API is the world's first quantified and programmatically-formatted set of Star Wars data.</p>
                    <p className = 'description-third__right-block-text'>After hours of watching films and trawling through content online, they present to us all the People, Films, Species, Starships, Vehicles and Planets from Star Wars.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='weather__container'>
              <div className = 'weather__block'>
                <img className = 'weather__image' src={'http://localhost:7070/' + results[number].name + '.jpg'} alt='weather'></img>
                <img className = 'weather__gif' src={WEATHER[variant]} alt='weather-gif'></img>
                <div className = 'weather__bottom-line'>
                  <p className = 'weather__temp'>{TEMP[variant]}</p>
                  <img className = 'weather__png' src={ICONS[variant]} alt='icon'></img>
                  <span className = 'weather__desc'>{DESCRIPTION[variant]}</span>
                  <span className = 'weather__name'>{results[number].name}</span>
                </div>
              </div>

              <div className='search__block'>
                <h3 className='search__title'>Search area</h3>
                <p className='search__text'>What kind of information do you want to find?</p>
                <div className='search__groups'>
                  <p className='search__group search__group--active' onClick={this.onGroupClick.bind(this)}>People</p>
                  <p className='search__group' onClick={this.onGroupClick.bind(this)}>Planets</p>
                  <p className='search__group' onClick={this.onGroupClick}>Vehicles</p>
                  <p className='search__group' onClick={this.onGroupClick}>Starships</p>
                  <p className='search__group' onClick={this.onGroupClick}>Species</p>
                  <p className='search__group' onClick={this.onGroupClick}>Films</p>
                </div>
                <label className='search__label'>
                  <input className='search__input' placeholder="Luke Skywalker" id="input-main-search" onChange={this.onFieldChanged} pattern="[A-Za-z]" />
                </label>
              </div>

              <div className = 'cite__block'>
                <img className = 'cite__bg' src='http://localhost:7070/Tatooine.jpg' alt='tatooine'></img>
                <div className = 'cite__right-block'>
                  <img className = 'cite__image' src='http://localhost:7070/Yoda-cite.png' alt='yoda'></img>
                </div>
                <p className = 'cite__text'>{CITES[citeRandom]}</p>
                <p className = 'cite__film'>{FILMS[citeRandom]}</p>
              </div>
            </div>
            
            <div id="search"></div>
            <div id="element"></div>
            <div id="reviews"><Review/></div>

            

          </div>
          )} else {
            return (
              <div>
                <div className = 'description'>
                  <div className="home-page__container home-page__container--apphome">
                      <h3 className="home-page__title">Welcome, <span className="home-page__text--blue">{userLogin.firstName}!</span></h3>
                      <Link className="home-page__logout" onClick={this.onLoginClick} to='/login'>Logout</Link>
                  </div>
                  <div className = 'description-third__container'>
                    <h1 className = 'description-third__text description-third__text--first'>Star Wars</h1>
                    <div className = 'description-third__blocks'>
                      <div className = 'description-third__left-block'>
                        <h2 className = 'description-third__title'>SWexplorer</h2>
                        <p className = 'description-third__left-block-text'>This application named Star Wars explorer is a set of web pages and scripts for visual display of the received data.</p>
                        <p className = 'description-third__left-block-text'>The data displayed in the application is obtained from the external freely available web service <a className = 'description-third__link description-third__link--light' href='https://swapi.co'>SWAPI</a>.</p>
                      </div>
                      <div className = 'description-third__central-block'>
                        <p className = 'description-third__central-block-text'>— is an American epic space opera media franchise, centered on a film series created by <a className = 'description-third__link' href='https://en.wikipedia.org/wiki/George_Lucas'>George Lucas</a>. It depicts the adventures of characters "a long time ago in a galaxy far, far away".</p>
                        <p className = 'description-third__central-block-text description-third__central-block-text--last'>The Star Wars franchise takes place in a distant unnamed fictional galaxy at an undetermined point in the ancient past, where many species of aliens (often humanoid) co-exist. People own robotic droids, who assist them in their daily routines, and space travel is common.</p>
                      </div>
                      <div className = 'description-third__right-block'>
                        <h2 className = 'description-third__title'>SWAPI</h2>
                        <p className = 'description-third__right-block-text'>The Star Wars API is the world's first quantified and programmatically-formatted set of Star Wars data.</p>
                        <p className = 'description-third__right-block-text'>After hours of watching films and trawling through content online, they present to us all the People, Films, Species, Starships, Vehicles and Planets from Star Wars.</p>
                      </div>
                    </div>
                  </div>
                </div>
    
                <div className='weather__container'>
                  <div className = 'weather__block'>
                    <img className = 'weather__image' src={'http://localhost:7070/' + results[number].name + '.jpg'} alt='weather'></img>
                    <img className = 'weather__gif' src={WEATHER[variant]} alt='weather-gif'></img>
                    <div className = 'weather__bottom-line'>
                      <p className = 'weather__temp'>{TEMP[variant]}</p>
                      <img className = 'weather__png' src={ICONS[variant]} alt='icon'></img>
                      <span className = 'weather__desc'>{DESCRIPTION[variant]}</span>
                      <span className = 'weather__name'>{results[number].name}</span>
                    </div>
                  </div>
    
                  <div className='search__block'>
                    <h3 className='search__title'>Search area</h3>
                    <p className='search__text'>What kind of information do you want to find?</p>
                    <div className='search__groups'>
                      <p className='search__group search__group--active' onClick={this.onGroupClick.bind(this)}>People</p>
                      <p className='search__group' onClick={this.onGroupClick.bind(this)}>Planets</p>
                      <p className='search__group' onClick={this.onGroupClick}>Vehicles</p>
                      <p className='search__group' onClick={this.onGroupClick}>Starships</p>
                      <p className='search__group' onClick={this.onGroupClick}>Species</p>
                      <p className='search__group' onClick={this.onGroupClick}>Films</p>
                    </div>
                    <label className='search__label'>
                      <input className='search__input' placeholder="Luke Skywalker" id="input-main-search" onChange={this.onFieldChanged} pattern="[A-Za-z]" />
                    </label>
                  </div>
    
                  <div className = 'cite__block'>
                    <img className = 'cite__bg' src='http://localhost:7070/Tatooine.jpg' alt='tatooine'></img>
                    <div className = 'cite__right-block'>
                      <img className = 'cite__image' src='http://localhost:7070/Yoda-cite.png' alt='yoda'></img>
                    </div>
                    <p className = 'cite__text'>{CITES[citeRandom]}</p>
                    <p className = 'cite__film'>{FILMS[citeRandom]}</p>
                  </div>
                </div>
                
                <div id="search"></div>
                <div id="element"></div>
                <div id="reviews"><Review/></div>
    
                
    
              </div>
              )
          }
        } else if (userLogin !== null) {
          return (
            <div>
              <div className = 'description'>
                <div className="home-page__container home-page__container--apphome">
                    <h3 className="home-page__title">Welcome, <span className="home-page__text--blue">{userLogin.firstName}!</span></h3>
                    <Link className="home-page__logout" onClick={this.onLoginClick} to='/login'>Logout</Link>
                </div>
                <div className = 'description-third__container'>
                  <h1 className = 'description-third__text description-third__text--first'>Star Wars</h1>
                  <div className = 'description-third__blocks'>
                    <div className = 'description-third__left-block'>
                      <h2 className = 'description-third__title'>SWexplorer</h2>
                      <p className = 'description-third__left-block-text'>This application named Star Wars explorer is a set of web pages and scripts for visual display of the received data.</p>
                      <p className = 'description-third__left-block-text'>The data displayed in the application is obtained from the external freely available web service <a className = 'description-third__link description-third__link--light' href='https://swapi.co'>SWAPI</a>.</p>
                    </div>
                    <div className = 'description-third__central-block'>
                      <p className = 'description-third__central-block-text'>— is an American epic space opera media franchise, centered on a film series created by <a className = 'description-third__link' href='https://en.wikipedia.org/wiki/George_Lucas'>George Lucas</a>. It depicts the adventures of characters "a long time ago in a galaxy far, far away".</p>
                      <p className = 'description-third__central-block-text description-third__central-block-text--last'>The Star Wars franchise takes place in a distant unnamed fictional galaxy at an undetermined point in the ancient past, where many species of aliens (often humanoid) co-exist. People own robotic droids, who assist them in their daily routines, and space travel is common.</p>
                    </div>
                    <div className = 'description-third__right-block'>
                      <h2 className = 'description-third__title'>SWAPI</h2>
                      <p className = 'description-third__right-block-text'>The Star Wars API is the world's first quantified and programmatically-formatted set of Star Wars data.</p>
                      <p className = 'description-third__right-block-text'>After hours of watching films and trawling through content online, they present to us all the People, Films, Species, Starships, Vehicles and Planets from Star Wars.</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className='weather__container'>
                <div className = 'weather__block'>
                  <img className = 'weather__image' src={'http://localhost:7070/' + results[number].name + '.jpg'} alt='weather'></img>
                  <img className = 'weather__gif' src={WEATHER[variant]} alt='weather-gif'></img>
                  <div className = 'weather__bottom-line'>
                    <p className = 'weather__temp'>{TEMP[variant]}</p>
                    <img className = 'weather__png' src={ICONS[variant]} alt='icon'></img>
                    <span className = 'weather__desc'>{DESCRIPTION[variant]}</span>
                    <span className = 'weather__name'>{results[number].name}</span>
                  </div>
                </div>
  
                <div className='search__block'>
                  <h3 className='search__title'>Search area</h3>
                  <p className='search__text'>What kind of information do you want to find?</p>
                  <div className='search__groups'>
                    <p className='search__group search__group--active' onClick={this.onGroupClick.bind(this)}>People</p>
                    <p className='search__group' onClick={this.onGroupClick.bind(this)}>Planets</p>
                    <p className='search__group' onClick={this.onGroupClick}>Vehicles</p>
                    <p className='search__group' onClick={this.onGroupClick}>Starships</p>
                    <p className='search__group' onClick={this.onGroupClick}>Species</p>
                    <p className='search__group' onClick={this.onGroupClick}>Films</p>
                  </div>
                  <label className='search__label'>
                    <input className='search__input' placeholder="Luke Skywalker" id="input-main-search" onChange={this.onFieldChanged} pattern="[A-Za-z]" />
                  </label>
                </div>
  
                <div className = 'cite__block'>
                  <img className = 'cite__bg' src='http://localhost:7070/Tatooine.jpg' alt='tatooine'></img>
                  <div className = 'cite__right-block'>
                    <img className = 'cite__image' src='http://localhost:7070/Yoda-cite.png' alt='yoda'></img>
                  </div>
                  <p className = 'cite__text'>{CITES[citeRandom]}</p>
                  <p className = 'cite__film'>{FILMS[citeRandom]}</p>
                </div>
              </div>
              
              <div id="search"></div>
              <div id="element"></div>
              <div id="reviews"><Review/></div>
  
              
  
            </div>
            )
        }
      }
      
      
    }
    //window.onload = function () {
      //if (document.getElementById('element')) {
        //render(<ElementCard name={'Luke Skywalker'} variant={'people'} />, document.getElementById('element'));
      //}
    //}
    const timeId = setInterval(function () {
      if (document.querySelector('.search__input')) {
        //console.log('bbbb');
        //document.querySelector('.search__input').onchange();
        render(<ElementCard name={'Luke Skywalker'} variant={'people'} />, document.getElementById('element'));
      }
    }, 800);
    setTimeout(function() {clearInterval(timeId)}, 2000);
    
  }
  


  onFieldChanged = (e) => {
    if (document.getElementById('element').innerHTML === "") {
      render(<ElementCard name={'Luke Skywalker'} variant={'people'} />, document.getElementById('element'));
    } else {
    //console.log(e.target);
    ReactDOM.unmountComponentAtNode(document.getElementById('search'));
    //const text = e.target.value.trim();   // удаляем пробелы
    //console.log(text);
    //console.log(e.target);
    //this.setState({text: e.target.value.trim()}, console.log('text', this.state.text));
      
        render(<Search name={checkLanguage(e.target.value.trim())} variant={this.state.group} />, document.getElementById('search'));
    }
  }

  onGroupClick = (e) => {
    document.querySelector('.search__group--active').classList.remove('search__group--active');
    e.target.classList.add('search__group--active');
    this.setState({group: e.target.innerHTML.toLowerCase()});
    document.querySelector('.search__input').value = '';
    document.querySelector('.search__input').placeholder = GROUPS[e.target.innerHTML.toLowerCase()];
    //this.onFieldChanged(<input className='search__input' placeholder="Luke Skywalker" id="input-main-search" onChange={this.onFieldChanged} />);
    ReactDOM.unmountComponentAtNode(document.getElementById('search'));
  }

  onLoginClick = (e) => {
    localStorage.setItem("token", "null");
    document.cookie = "token=; path=/; expires=;";
    window.location.reload(true);
  }
  

  render() {
    //if (this._isMounted) {
      return (
        <div className='Apphome'>
          <div className='weather'>
            {this.renderWeather()}
          </div>
        </div>
      )
    //}
  }
}

//window.onload = function () {
  //console.log('aaaa');
  
//}


/*if (document.querySelector('#element') && document.querySelector('#reviews')) {
render(<ElementCard name={'Luke Skywalker'} variant={'people'} />, document.getElementById('element'));
render(<Review/>, document.getElementById('reviews'));
}*/

export default Apphome