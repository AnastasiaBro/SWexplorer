import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import Search from './Search.js'
import './App.css';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const WEATHER = ['./img/rain.gif', './img/snow.gif', './img/fog.gif', './img/sunny.gif', './img/rain.gif', './img/snow.gif', './img/fog.gif', './img/sunny.gif'];
const TEMP = ['+13°C', '-10°C', '+7°C', '+30°C', '+24°C', '-23°C', '+15°C', '+17°C'];
const ICONS = ['./img/rain-icon.png', './img/snow-icon.png', './img/fog-icon.png', './img/sun-icon.png', './img/rain-icon.png', './img/snow-icon.png', './img/fog-icon.png', './img/sun-icon.png'];
const URLS = ['https://swapi.co/api/planets','https://swapi.co/api/planets/?page=2'];
const DESCRIPTION = ['rain', 'snow', 'wind', 'sun', 'rain', 'snow', 'wind', 'sun'];

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
      text: ''
    }
  }
  componentDidMount() {
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
        this.setState({
          data: JSON.parse(xhr.responseText),
          isLoading: false,
          text: ''
        })
      }
    }
  }

  renderWeather() {
    const { data, isLoading, text } = this.state
    if (isLoading) {
      return <p className = 'first-text'>A long time ago in a galaxy far,<br></br> far away...</p> // рисуем прелоадер
    } else {
      if (data.results !== undefined) { //проверка, что data.results загружен
          const results = [];  //данные
          const number = getRandomInt(0, 9);
          const variant = getRandomInt(0, 7);
          const citeRandom = getRandomInt(0, 5);
          console.log(number);

          for (var i = 0; i < this.state.data.results.length; i++) {
              results[i] = this.state.data.results[i];
          }

          const listResults = results.map((results, index) =>
              <li className = 'film__item' key={index}>
                  <img className = 'film__image' src={'./img/' + results.title + '.jpg'} alt="film"></img>
                  <p className = 'film__item-text film__item-text--first'>{results.title}</p>
                  <h6 className = 'visually-hidden'>{index}</h6>
              </li>
          );

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

          return (
          <div>
            <div className = 'description'>
              <div className = 'description__container'>
                <p className = 'description__text description__text--first'>Do you remember:</p>
                <div className = 'description__text-container'>
                  <div className = 'description__left-container'>
                    <img className = 'description__image' src='./img/luke_your_father.jpg'></img>
                    <p className = 'description__text description__text--second'>Luke, I'm your father!</p>
                  </div>
                  <div className = 'description__right-container'>
                    <img className = 'description__image' src='./img/droids.jpg'></img>
                    <p className = 'description__text description__text--third'>These aren't the droids you're looking for</p>
                  </div>
                </div>
              </div>

              <div className = 'description-second__container'>
                <p className = 'description-second__text description-second__text--first'>It is Star Wars Universe</p>
                <img className = 'description-second__image' src='./img/fight.jpg'></img>
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
                <img className = 'weather__image' src={'./img/' + results[number].name + '.jpg'}></img>
                <img className = 'weather__gif' src={WEATHER[variant]}></img>
                <div className = 'weather__bottom-line'>
                  <p className = 'weather__temp'>{TEMP[variant]}</p>
                  <img className = 'weather__png' src={ICONS[variant]}></img>
                  <span className = 'weather__desc'>{DESCRIPTION[variant]}</span>
                  <span className = 'weather__name'>{results[number].name}</span>
                </div>
              </div>

              <div className = 'cite__block'>
                <img className = 'cite__bg' src='./img/Tatooine.jpg'></img>
                <div className = 'cite__right-block'>
                  <img className = 'cite__image' src='./img/Yoda-cite.png'></img>
                </div>
                <p className = 'cite__text'>{CITES[citeRandom]}</p>
                <p className = 'cite__film'>{FILMS[citeRandom]}</p>
              </div>
            </div>
            
            
            
            <label>
              <input placeholder="Enter a name" id="input-main-search" onChange={this.onFieldChanged} />
            </label>

            

          </div>
          )
      }
      
    }
  }

  onFieldChanged(e) {
    ReactDOM.unmountComponentAtNode(document.getElementById('search'));
    //this.forceUpdate();
    const text = e.target.value.trim();   // удаляем пробелы
    //this.state.newName = text; // передаем введенный текст в родительский компонент
    //return text;
    console.log(text);
    render(<Search name={e.target.value.trim()} />, document.getElementById('search'));
    //<Search name={this.state.newName} />
  }

  render() {
    return (
      <div className='Apphome'>
        <div className='weather'>
          {this.renderWeather()}
        </div>
      </div>
    )
  }
}

export default Apphome