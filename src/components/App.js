import React from 'react'
//import ReactDOM from 'react-dom';
import './App.css';


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
                    <h6 className = 'visually-hidden'>{index + 1}</h6>
                </li>
            );

            const listOpening = opening[1].map((results, index) =>
                <li className = 'film__opening' key={index}>{opening[1][index]}<span className = 'transparent'>space</span></li>
            );

            return (
            <div className='film'>
                <h1 className = 'film__text'>Films</h1>
                <p className = 'film__text'>Count: {data.count}</p>
                <div className = 'film__container'>
                    <ul className = 'film__list'>{listResults}</ul>
                </div>
                <div className = 'film__logo'>
                    <img className = 'film__logo-image' src='/img/logo-sw.jpg' alt='logo'></img>
                    <div className = 'film__logo-left'>
                      <ul className = 'film__opening-list'>{listOpening}</ul>
                    </div>
                    <div className = 'film__logo-right'>
                      <div className = 'film__logo-container'>
                        <div className = 'film__logo-row'>
                          <p className = 'film__logo-right-text'>Episode number:</p>
                          <p className = 'film__logo-right-text'>{results[1].episode_id}</p>
                        </div>
                        <div className = 'film__logo-row'>
                          <p className = 'film__logo-right-text'>Director:</p>
                          <p className = 'film__logo-right-text'>{results[1].director}</p>
                        </div>
                        <div className = 'film__logo-row'>
                          <p className = 'film__logo-right-text'>Release date:</p>
                          <p className = 'film__logo-right-text'>{results[1].release_date.substring(0,4)}</p>
                        </div>
                        <div className = 'film__logo-row'>
                          <p className = 'film__logo-right-text'>Characters:</p>
                          <p className = 'film__logo-right-text'>loading...</p>
                        </div>
                        <div className = 'film__logo-row'>
                          <p className = 'film__logo-right-text'>Planets:</p>
                          <p className = 'film__logo-right-text'>loading...</p>
                        </div>
                      </div>
                    </div>
                </div>
            </div>)
        }
      }
    }

    handleClick = (e) => {
      if (e.target.parentNode.className === 'film__item') {
          const number = e.target.parentNode.querySelector('h6').innerText;
          console.log(number);
      } else if (e.target.className === 'film__item') {
          const number = e.target.querySelector('h6').innerText;
          console.log(number);
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
