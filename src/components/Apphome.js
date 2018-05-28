import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import './App.css';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const WEATHER = ['rain', 'snow', 'fog', 'cloud'];

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
    const URL = 'https://swapi.co/api/planets';
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
      return <p className = 'first-text'>weather forecast will be soon</p> // рисуем прелоадер
    } else {
      if (data.results !== undefined) { //проверка, что data.results загружен
          const results = [];  //данные
          const number = getRandomInt(0, 9);
          console.log(number);

          for (var i = 0; i < this.state.data.results.length; i++) {
              results[i] = this.state.data.results[i];
          }

          const listResults = results.map((results, index) =>
              <li className = 'film__item' key={index}>
                  <img className = 'film__image' src={'/img/' + results.title + '.jpg'} alt="film"></img>
                  <p className = 'film__item-text film__item-text--first'>{results.title}</p>
                  <h6 className = 'visually-hidden'>{index}</h6>
              </li>
          );

          return (
          <div className='weather__container'>
              <h1 className = 'weather__text'>Weather</h1>
              <div className = 'weather__block'>
                <img className = 'weather__image' src={'/img/' + results[number].name + '.jpg'}></img>
                <img className = 'weather__gif' src={'/img/' + WEATHER[getRandomInt(0, 1)] + '.gif'}></img>
                <p className = 'weather__name'>{results[number].name}</p>
              </div>
          </div>)
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