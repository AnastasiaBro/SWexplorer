import React from 'react';
import ReactDOM from 'react-dom';
import ActiveFilm from './ActiveFilm.js';
import './App.css';
import {render} from 'react-dom';
window.id = 0; //изначально первый элемент с данными


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
        return <p className = 'first-text'>far far away...</p> // рисуем прелоадер
      } else {
        if (data.results !== undefined) { //проверка, что data.results загружен
            const results = [];  //данные
            const opening = [];  //чтобы абзацами вывести титры

            for (var i = 0; i < this.state.data.results.length; i++) {
                results[i] = this.state.data.results[i];
                opening[i] = this.state.data.results[i].opening_crawl.split('\r\n');
            }

            //console.log(opening);

            const listResults = results.map((results, index) =>
                <li className = 'film__item' key={index} onClick={this.handleClick}>
                    <img className = 'film__image' src={'./img/' + results.title.toString() + '.jpg'} alt="film"></img>
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
                    <img className = 'film__logo-image' src='./img/logo-sw1.jpg' alt='logo'></img>
                    
                    <div id="logo-active">
                    </div>                    

                </div>
            </div>)
        }
      }
    }

    handleClick = (e) => {
      render(<ActiveFilm data={this.props.data} />, document.getElementById('logo-active'));
      //document.querySelector('.film__logo-first').classList.remove('film__logo-central');

      //document.querySelector('.film__logo-first').classList.add('hidding');

      //function logoAppear() {
      //<img className = 'film__logo-first' src='./img/logo-star.png' alt='logo'></img>
      //}
      
      //setTimeout(logoAppear, 100);

      const windowFilmInfo = document.querySelector('.film__appear');
      const filmItem = document.querySelectorAll('.film__item');

      if (document.getElementById('first-window-line')) {
        ReactDOM.unmountComponentAtNode(document.getElementById('first-window-line'));
      }

      if (document.getElementById('second-window-line')) {
        ReactDOM.unmountComponentAtNode(document.getElementById('second-window-line'));
      }

      if (document.querySelector('.film__first-window')) {
        document.querySelector('.film__first-window').classList.add('visually-hidden');
      }

      if (document.querySelector('.film__second-window')) {
        document.querySelector('.film__second-window').classList.add('visually-hidden');
      }

      windowFilmInfo.classList.add('visually-hidden'); //прячем элемент с данными о фильме
      filmItem[window.id].classList.remove('film__item--active'); //обводка вокруг старого элемента убирается

      if (e.target.parentNode.className === 'film__item') {
          window.id = e.target.parentNode.querySelector('h6').innerText; //номер элемента
          this.setState({id: window.id});
          windowFilmInfo.classList.remove('visually-hidden');  //показываем данные выбранного элемента
          filmItem[window.id].classList.add('film__item--active'); //обводка
          
      } 
      else if (e.target.className === 'film__item') {
          window.id = e.target.querySelector('h6').innerText;
          this.setState({id: window.id});
          windowFilmInfo.classList.remove('visually-hidden');
          filmItem[window.id].classList.add('film__item--active');
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
