import React from 'react';
import ReactDOM from 'react-dom';
import ActiveFilm from './ActiveFilm.js';
import './App.css';
import {render} from 'react-dom';
//import Header from './Header.js';
//import Search from './Search.js'
window.id = 0; //изначально первый элемент с данными
window.item = 0;
//document.querySelector('.body-style').classList.add('bg-films');
//document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
//document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
//document.querySelectorAll('.main-nav__item')[1].classList.add('main-nav__item--active');
//document.querySelectorAll('.main-nav__link')[1].classList.add('main-nav__link--active');

const indexes = {'A New': 0, 'Attac': 1, 'The P': 2, 'Reven': 3, 'Retur': 4, 'The E': 5, 'The F': 6}


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
        return <p className = 'first-text'>A long time ago in a galaxy far,<br></br> far away...</p> // рисуем прелоадер
      } else {
        if (data.results !== undefined) { //проверка, что data.results загружен
            const results = [];  //данные
            const opening = [];  //чтобы абзацами вывести титры
            const titles = [];

            for (var i = 0; i < this.state.data.results.length; i++) {
                results[i] = this.state.data.results[i];
                opening[i] = this.state.data.results[i].opening_crawl.split('\r\n');
                titles[i] = this.state.data.results[i].title;
            }

            /*--------------------------*/

            console.log(titles);

            const propsValues = {
              items: titles
            };
                    
            class SearchPlugin extends React.Component{
                        
                constructor(props){
                    super(props);
                    this.onTextChanged = this.onTextChanged.bind(this);
                }
                        
                onTextChanged(e){
                    if(e.key == 'Enter') { 
                        var text = e.target.value.trim();   // удаляем пробелы
                        this.props.filter(text); // передаем введенный текст в родительский компонент
                        const filmItem = document.querySelectorAll('.film__item');
                        if (document.querySelector('.film__item--active')) {
                          filmItem[window.item].classList.remove('film__item--active'); //обводка вокруг старого элемента убирается
                        }
                        window.id = 0;
                        window.item = 0;
                        if (document.querySelector('.film__appear')) {
                          document.querySelector('.film__appear').classList.add('visually-hidden');
                        }
                        if (document.querySelector('.film__first-window')) {
                          document.querySelector('.film__first-window').classList.add('visually-hidden');
                        }
                
                        if (document.querySelector('.film__second-window')) {
                          document.querySelector('.film__second-window').classList.add('visually-hidden');
                        }
                    }
                }

                onSearchClick(e) {
                    
                }
                        
                render() {
                    return(
                    <div className="search-field">
                        <input placeholder="Search film" className = 'main-nav__input' id="input-first" onKeyPress={this.onTextChanged} />
                        <label className="main-nav__search" htmlFor="input-first"></label>
                        <div className="container__light">
                            <div className="saber">
                                <div className="blade"></div>
                                <div className="hilt">
                                    <div className="button" onClick={this.onButtonClick}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
            }
                              
            class ItemsList extends React.Component {
                constructor(props){
                    super(props);
                    this.state = { items: titles};
                                      
                    this.filterList = this.filterList.bind(this);
                }
                        
                filterList(text){
                    var filteredList = titles.filter(function(item){
                        return item.toLowerCase().search(text.toLowerCase())!== -1;
                    }); 
                    this.setState({items: filteredList});
                }
                          
                render() {
                    return(
                            <div>
                            <SearchPlugin filter={this.filterList} />
                                <ul className = 'film__list'>
                                    {
                                        this.state.items.map((item, index) =>
                                        
                                            <li className = 'film__item' key={index} onClick={this.handleClick}>
                                                <img className = 'film__image' src={'./img/' + item.toString() + '.jpg'} alt="film"></img>
                                                <p className = 'film__item-text film__item-text--first'>{item}</p>
                                                <h6 className = 'visually-hidden'>{indexes[item.substring(0, 5)]}</h6>
                                                <h6 className = 'visually-hidden'>{index}</h6>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>);
                }

                handleClick = (e) => {
                    render(<ActiveFilm data={this.props.data} />, document.getElementById('logo-active'));
                    //document.querySelector('.film__logo-first').classList.remove('film__logo-central');
              
                    document.querySelector('.film__logo-text').classList.add('hidding');
              
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
                    filmItem[window.item].classList.remove('film__item--active'); //обводка вокруг старого элемента убирается
              
                    if (e.target.parentNode.className === 'film__item') {
                        window.id = e.target.parentNode.querySelectorAll('h6')[0].innerText; //номер элемента
                        window.item = e.target.parentNode.querySelectorAll('h6')[1].innerText;
                        this.setState({id: window.id});
                        windowFilmInfo.classList.remove('visually-hidden');  //показываем данные выбранного элемента
                        filmItem[window.item].classList.add('film__item--active'); //обводка
                        
                    } 
                    else if (e.target.className === 'film__item') {
                        window.id = e.target.parentNode.querySelectorAll('h6')[0].innerText; //номер элемента
                        window.item = e.target.parentNode.querySelectorAll('h6')[1].innerText;
                        this.setState({id: window.id});
                        windowFilmInfo.classList.remove('visually-hidden');
                        filmItem[window.item].classList.add('film__item--active');
                    }
                  }
            }

            
            
            /*--------------------------*/
            document.querySelector('.body-style').classList.add('bg-films');
            document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
            document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
            document.querySelectorAll('.main-nav__item')[1].classList.add('main-nav__item--active');
            document.querySelectorAll('.main-nav__link')[1].classList.add('main-nav__link--active');

            const listResults = titles.map((titles, index) =>
                <li className = 'film__item' key={index} onClick={this.handleClick}>
                    <img className = 'film__image' src={'./img/' + titles.toString() + '.jpg'} alt="film"></img>
                    <p className = 'film__item-text film__item-text--first'>{titles}</p>
                    <h6 className = 'visually-hidden'>{index}</h6>
                </li>
            );

            return (
            <div className='film' id="film">
                <h1 className = 'film__text'>Films</h1>
                <p className = 'film__text'>Count: {data.count}</p>
                <div className = 'film__container'>
                    <ItemsList data={propsValues} />
                
                </div>
                <div className = 'film__logo' id = 'logo'>
                    <img className = 'film__logo-image' src='./img/logo-sw1.jpg' alt='logo'></img>
                    <h2 className = 'film__logo-text'>Click one film to start...</h2>
                    <div id="logo-active">
                    </div>                    

                </div>
            </div>)
        }
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
