import React from 'react';
//import ReactDOM from 'react-dom';
import ActiveFilm from './ActiveFilm.js';
import './App.css';
window.id = 0;


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [],
        isLoading: false,
      }
    }
    componentDidMount() {
      const xhr = new XMLHttpRequest();
      const URL = 'https://swapi.co/api/films';
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

    renderFilms() {
      const { data, isLoading } = this.state
      if (isLoading) {
        return <img src='/i/preloader.gif' alt='загружаю...' /> // рисуем прелоадер
      } else {
        if (data.results !== undefined) { //проверка, что data.results загружен
            const results = [];  //данные
            const opening = [];  //чтобы абзацами вывести титры

            for (var i = 0; i < this.state.data.results.length; i++) {
                results[i] = this.state.data.results[i];
                opening[i] = this.state.data.results[i].opening_crawl.split('\r\n');
            }

            console.log(opening);

            const listResults = results.map((results, index) =>
                <li className = 'film__item' key={index} onClick={this.handleClick}>
                    <img className = 'film__image' src={'/img/' + results.title.toString() + '.jpg'} alt="film"></img>
                    <p className = 'film__item-text film__item-text--first'>{results.title}</p>
                    <h6 className = 'visually-hidden'>{index}</h6>
                </li>
            );

            return (
            <div className='film'>
                <h1 className = 'film__text'>Films</h1>
                <p className = 'film__text'>Count: {data.count}</p>
                <div className = 'film__container'>
                    <ul className = 'film__list'>{listResults}</ul>
                </div>
                <div className = 'film__logo' id = 'logo'>
                    <img className = 'film__logo-image' src='/img/logo-sw.jpg' alt='logo'></img>

                    <ActiveFilm />

                </div>
            </div>)
        }
      }
    }

    handleClick = (e) => {
      document.querySelector('.film__appear').classList.add('visually-hidden');
      document.querySelectorAll('.film__item')[window.id].classList.remove('film__item--active');
      if (e.target.parentNode.className === 'film__item') {
          window.id = e.target.parentNode.querySelector('h6').innerText;
          console.log(window.id);
          this.setState({id: window.id});
          document.querySelector('.film__appear').classList.remove('visually-hidden');
          document.querySelectorAll('.film__item')[window.id].classList.add('film__item--active');
      } else if (e.target.className === 'film__item') {
          window.id = e.target.querySelector('h6').innerText;
          console.log(window.id);
          this.setState({id: window.id});
          document.querySelector('.film__appear').classList.remove('visually-hidden');
          document.querySelectorAll('.film__item')[window.id].classList.add('film__item--active');
      }
    }

    render() {
      return (
        <div className='App'>
          <div className='film-list'>
            {this.renderFilms()}
          </div>
        </div>
      )
    }
  }

export default App
