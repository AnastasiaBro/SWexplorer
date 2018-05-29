import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
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
        })
      }
    }
  }

  renderWeather() {
    const { data, isLoading } = this.state
    if (isLoading) {
      return <p className = 'first-text'></p> // рисуем прелоадер
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

          return (
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
                <div className = 'cite__right-block'>
                  <img className = 'cite__image' src='./img/Yoda-cite.png'></img>
                </div>
                <p className = 'cite__text'>{CITES[citeRandom]}</p>
                <p className = 'cite__film'>{FILMS[citeRandom]}</p>
              </div>
          </div>
          )
      }
    }
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