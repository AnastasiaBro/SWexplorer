import React from 'react';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
import InnerFilm from './InnerFilm';
import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom';
import {render} from 'react-dom';

//import { userActions } from './_actions';

//const directors = [{"name": "George Lucas", "date": "May 14, 1944", "birthplace": "Modesto, California, U.S.", "biography": ""}, {"name": "Richard Marquand", "date": "Sept. 22, 1937", "birthplace": "Llanishen, Cardiff, Wales", "biography": ""}, {"name": "Irvin Kershner", "date": "Apr. 29, 1923", "birthplace": "Philadelphia, Pennsylvania, U.S.", "biography": ""}, {"name": "J. J. Abrams", "date": "June 27, 1966", "birthplace": "New York City, New York, U.S.", "biography": ""}];

function getPhoto(str, name) {
    if (name === 'George Lucas' || name === 'Richard Marquand' || name === 'Irvin Kershner' || name === 'J. J. Abrams') {
        return str;
    } else {
        return 'http://localhost:7070/no-photo.png';
    }
}

class Directors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            born: "",
            place: "",
            biography: "",
            name: "",
            addBorn: "",
            addPlace: "",
            addBiography: "",
            addName: "",
            data: [],
            data2: [],
            data3: [],
            data4: [],
            filmsList: '',
            freeFilms: '',
            allFilms: [],
            map: {}
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBorn = this.onChangeBorn.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeBiography = this.onChangeBiography.bind(this);

        this.onChangeAddName = this.onChangeAddName.bind(this);
        this.onChangeAddBorn = this.onChangeAddBorn.bind(this);
        this.onChangeAddPlace = this.onChangeAddPlace.bind(this);
        this.onChangeAddBiography = this.onChangeAddBiography.bind(this);
    }

    callthebase = () => {
        const xhr = new XMLHttpRequest();
        const URL = 'http://192.168.148.30:8554/api/v2/directors';
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
        this.setState({freeFilms: ''});
    }

    componentDidMount() {
        this.callthebase();
        
    }

    onChangeName = (e) => {
        var val = e.target.value;
        this.setState({name: val});
    }

    onChangeBorn = (e) => {
        var val = e.target.value;
        this.setState({born: val});
    }

    onChangePlace = (e) => {
        var val = e.target.value;
        this.setState({place: val});
    }

    onChangeBiography = (e) => {
        var val = e.target.value;
        this.setState({biography: val});
    }

    onChangeAddName = (e) => {
        var val = e.target.value;
        this.setState({addName: val});
    }

    onChangeAddBorn = (e) => {
        var val = e.target.value;
        this.setState({addBorn: val});
    }

    onChangeAddPlace = (e) => {
        var val = e.target.value;
        this.setState({addPlace: val});
    }

    onChangeAddBiography = (e) => {
        var val = e.target.value;
        this.setState({addBiography: val});
    }

    renderDirectors () {
      const { user, users } = this.props;
      const { data } = this.state;
      if (data._embedded !== undefined) {

      const directors = this.state.data._embedded.directors;
        
      
      const usersList = directors.map((director, index) =>
          <li className = 'directors__item' key={index} onClick={this.onItemClick}>
              <img className = 'directors__image' src={getPhoto('http://localhost:7070/' + director.name + '.jpg', director.name)} alt="director"></img>
              <p className = 'directors__item-text directors__name'>{director.name}</p>
              <h6 className = 'directors__index visually-hidden'>{index}</h6>
              <h6 className = 'directors__href visually-hidden'>{director._links.self.href}</h6>
              <h6 className = 'directors__films visually-hidden'>{director._links.films.href}</h6>
          </li>
      );

      //hidden();

      //window.onload = function () {
        if (document.querySelector('.main-nav__item--active')) {
            document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
            document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
            document.querySelectorAll('.main-nav__item')[2].classList.add('main-nav__item--active');
            document.querySelectorAll('.main-nav__link')[2].classList.add('main-nav__link--active');
          }
          window.onload = function () {
            //if (document.querySelector('.main-nav__item--active')) {
                document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
                document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
                document.querySelectorAll('.main-nav__item')[2].classList.add('main-nav__item--active');
                document.querySelectorAll('.main-nav__link')[2].classList.add('main-nav__link--active');
            //}
        }
          
      //}

      //let userLogin = JSON.parse(localStorage.getItem('user'));
      let userLogin = JSON.parse(localStorage.getItem('user'));

      if (userLogin !== null && userLogin.username === "admin") {

      return (
          <div>
              <div className="home-page">
                <div className="home-page__container">
                    <h3 className="home-page__title">Welcome, <span className="home-page__text--blue">{userLogin.firstName}!</span></h3>
                    <Link className="home-page__logout" onClick={this.onLoginClick} to='/login'>Logout</Link>
                </div>
                      
                  <div className="page-container">

                      <div className="blocks">
                          <div className="directors">
                              <p className="directors__text">Directors:</p>
                              <ul className="directors__list">{usersList}</ul>
                              <p className="directors__text directors__count">Count: {directors.length}</p>
                              <div className="directors__button-container">
                                  <button className="directors__button directors__add-button" onClick={this.onAddClick}>Add</button>
                              </div>
                          </div>

                          <div className="directors-data visually-hidden">
                              <div className="directors-data__row directors-data__row--wide">
                                  <p className="directors-data__text">Edit Information:</p>
                                  <button className="directors-data__close" onClick={this.onCloseClick}><span className="visually-hidden">Close</span></button>
                              </div>
                              <div className="directors-data__list">
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="name">Name:</label>
                                      <input className="directors-data__item-input" type="text" value={this.state.name} onChange={this.onChangeName} name="name" id="name"/>
                                  </div>
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="born">Birthday:</label>
                                      <input className="directors-data__item-input" type="text" value={this.state.born} onChange={this.onChangeBorn} name="born" id="born"/>
                                  </div>
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="biography">Biography:</label>
                                      <textarea className="directors-data__item-input directors-data__item-textarea" type="text" value={this.state.biography} onChange={this.onChangeBiography} name="biography" id="biography"/>
                                  </div>
                                  <button className="directors__button directors__delete-button visually-hidden" onClick={this.onDeleteClick}>Delete</button>
                                  <button className="directors__button directors-data__button" onClick={this.onSaveClick}>Save information</button>
                              </div>

                          </div>

                          <form onSubmit={this.onSaveAddClick} className="directors-add visually-hidden">
                              <div className="directors-data__row directors-data__row--wide">
                                  <p className="directors-data__text">Add a new director:</p>
                                  <button className="directors-add__close" onClick={this.onCloseAddTableClick}><span className="visually-hidden">Close</span></button>
                              </div>
                              <div className="directors-data__list">
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="addName">Name:</label>
                                      <input className="directors-data__item-input input-required" type="text" placeholder="Name" value={this.state.addName} onChange={this.onChangeAddName} name="addName" id="addName" required/>
                                  </div>
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="addBorn">Birthday:</label>
                                      <input className="directors-data__item-input input-required" type="text" placeholder="16.04.1980" value={this.state.addBorn} onChange={this.onChangeAddBorn} name="addBorn" id="addBorn" required/>
                                  </div>
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="addBiography">Biography:</label>
                                      <textarea className="directors-data__item-input directors-data__item-textarea input-required" type="text" value={this.state.addBiography} placeholder="Many years ago..." onChange={this.onChangeAddBiography} name="addBiography" id="addBiography" required/>
                                  </div>
                              </div>
                              <button className="directors-add__save" type="submit">Save changes</button>
                          </form>

                          <div className="directors-films visually-hidden">
                              <div className="directors-data__row directors-data__row--wide">
                                  <p className="directors-data__text">Films of this director:</p>
                              </div>
                                
                              
                              <ul className = "directors-films__list">{this.state.filmsList}</ul>

                              <div className="directors-data__row directors-data__row--wide">
                                  <p className="directors-data__text">Choose films:</p>
                              </div>
                              <ul className = "directors-films__list">{this.state.freeFilms}</ul>
                              <p className="directors__text directors__count directors--absolute">chosen films by all directors: {this.state.allFilms.length}</p>
                              <button className="directors__button directors-data__button directors-films__save-button" onClick={this.onUpdateClick}>Save chosen films</button>
                            
                          </div>

                      </div>

                      
                  </div>
              </div>
          </div>
          
        );
        } else {

          return (
            <div>
                <div className="home-page">
                    <div className="home-page__container">
                        <h3 className="home-page__title visually-hidden">Welcome, <span className="home-page__text--blue"></span></h3>
                        <Link className="home-page__logout" onClick={this.onLoginClick} to='/login'>Login</Link>
                    </div>
                        
                    <div className="page-container">
  
                        <div className="blocks">
                            <div className="directors">
                                <p className="directors__text">Directors:</p>
                                <ul className="directors__list">{usersList}</ul>
                                <p className="directors__text directors__count">Count: {directors.length}</p>
                                <div className="directors__button-container">
                                    
                                </div>
                            </div>
  
                            <div className="directors-data visually-hidden">
                                <div className="directors-data__row directors-data__row--wide">
                                    <p className="directors-data__text">Information:</p>
                                    <button className="directors-data__close" onClick={this.onCloseClick}><span className="visually-hidden">Close</span></button>
                                </div>
                                <div className="directors-data__list">
                                    <div className="directors-data__row">
                                        <p className="directors-data__item-text--no-user">Name:</p>
                                        <p className="directors-data__item-text--no-user">{this.state.name}</p>
                                    </div>
                                    <div className="directors-data__row">
                                        <p className="directors-data__item-text--no-user">Born:</p>
                                        <p className="directors-data__item-text--no-user">{this.state.born}</p>
                                    </div>
                                    <div className="directors-data__row">
                                        <p className="directors-data__item-text--no-user">Biography:</p>
                                        <p className="directors-data__item-text--no-user directors-data__item-text--wide">{this.state.biography}</p>
                                    </div>
                                    
                                </div>
  
                            </div>

                            <div className="directors-films visually-hidden">
                              <div className="directors-data__row directors-data__row--wide">
                                  <p className="directors-data__text">Films of this director:</p>
                              </div>
                                
                              
                              <ul className = "directors-films__list">{this.state.filmsList}</ul>
                              <p className="directors__text directors__count directors--absolute">chosen films by all directors: {this.state.allFilms.length}</p>
                            
                            </div>
  
                        </div>
  
                    </div>
                </div>
            </div>
            
          );
        }

        
      }
    }

    render() {
        
        return (
          <div>
            {this.renderDirectors()}
          </div>
        )
        
    }

    onAddClick = (e) => {
        document.querySelector('.directors__add-button').classList.add('directors__add-button--active');
        document.querySelector('.directors-add').classList.remove('visually-hidden');
        if (document.querySelector('.directors__item--active')) {
            document.querySelector('.directors-data').classList.add('visually-hidden');
            document.querySelector('.directors-films').classList.add('visually-hidden');
            document.querySelector('.directors__item--active').classList.remove('directors__item--active');
        }
        for (let i = 0; i < 3; i++) {
            document.querySelectorAll('.input-required')[i].required = "required";
        }
    }

    getRelAndChosenFilms(number) {
        this.setState({filmsList: []});
        this.setState({freeFilms: []});
        this.setState({data2: []});
        console.log(number);
        const xhr = new XMLHttpRequest();
        const URL = document.querySelectorAll('.directors__films')[number].innerHTML; //это фильмы конкретного режиссера
        console.log('URL для вывода фильмов', URL);
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
                    data2: JSON.parse(xhr.responseText),
                    isLoading: false,
                })
                
                console.log('Пришли новые ссылки на фильмы', this.state.data2._embedded.films);
                const films = this.state.data2._embedded.films;

                const rel = [];

                let userLogin = JSON.parse(localStorage.getItem('user'));

                if (userLogin !== null && userLogin.username === "admin") {
                
                    const filmsList = films.map((film, index) =>
                        <li className = 'directors-films__item' key={index}>
                            <label className = 'directors-films__item-text' htmlFor={index} onClick={this.onFilmClick}>
                                <input className = 'directors-films__input' id={index} type="checkbox" name="first" defaultChecked></input>
                                <span className = 'directors-films__span'>{this.state.map[film._links.film.href.substring(40)]}</span>
                                <h6 className = 'directors-films__index visually-hidden'>{film._links.film.href.substring(40)}</h6>
                            </label>
                        </li>
                    );
                    
                    
                    this.setState({filmsList: filmsList});
                } else {
                    const filmsList = films.map((film, index) =>
                        <li className = 'directors-films__item' key={index}>
                            <label className = 'directors-films__item-text' htmlFor={index}>
                                <input className = 'directors-films__input' id={index} type="checkbox" name="first" checked readOnly></input>
                                <span className = 'directors-films__span'>{this.state.map[film._links.film.href.substring(40)]}</span>
                                <h6 className = 'directors-films__index visually-hidden'>{film._links.film.href.substring(40)}</h6>
                            </label>
                        </li>
                    );
                    
                    
                    this.setState({filmsList: filmsList});
                }
                
                console.log(this.state.data2._embedded);

                //if (films._links) {
                    for (let i = 0; i < films.length; i++) {
                        rel.push(films[i]._links.film.href.substring(40));
                    }
                    localStorage.setItem('relFilms', rel);
                    console.log(localStorage.getItem('relFilms'));
                //}
                
            }
        }


        
        const xhr3 = new XMLHttpRequest();
        const URL3 = 'http://192.168.148.30:8554/api/v2/films'; //отсюда придут связанные фильмы
        xhr3.open('GET', URL3, true);
        xhr3.send();
    
        xhr3.onreadystatechange = () => {
            if (xhr3.readyState !== 4) {
                return false
            }
    
            if (xhr3.status !== 200) {
                console.log(xhr3.status + ': ' + xhr3.statusText)
            } else {
                this.setState({
                data3: JSON.parse(xhr3.responseText),
                isLoading3: false,
                })
                const allFilms = [];
                if (this.state.data3._embedded) {
                    for (let i = 0; i < this.state.data3._embedded.films.length; i++) {
                        allFilms.push(Number(this.state.data3._embedded.films[i]._links.self.href.substring(40)));
                    }
                    console.log(allFilms);
                    localStorage.setItem("allFilms", allFilms);

                    function compareNumeric(a, b) {
                        if (a > b) return -1;
                        if (a < b) return 1;
                      }
                      
                      allFilms.sort(compareNumeric);
                      console.log('все связанные фильмы', allFilms);
                      this.setState({allFilms: allFilms});
                      
                }
            }
        }

        const xhr4 = new XMLHttpRequest();
        const URL4 = 'http://swapi.co/api/films'; //все индексы придут здесь - один запрос
        xhr4.open('GET', URL4, true);
        xhr4.send();
    
        xhr4.onreadystatechange = () => {
            if (xhr4.readyState !== 4) {
                return false
            }
    
            if (xhr4.status !== 200) {
                console.log(xhr4.status + ': ' + xhr4.statusText)
            } else {
                this.setState({
                data4: JSON.parse(xhr4.responseText),
                isLoading4: false,
                })
                const allTitles = [];
                const indexes = [];
                const titlesIndexes = [];

                const map = new Object();
                if (this.state.data4) {
                    for (let i = 0; i < this.state.data4.results.length; i++) {
                        allTitles.push(this.state.data4.results[i].title);
                        let key = this.state.data4.results[i].title;
                        indexes.push(i + 1);
                        titlesIndexes.push(Number(this.state.data4.results[i].url.substring(27, this.state.data4.results[i].url.length - 1)));

                        map[Number(this.state.data4.results[i].url.substring(27, this.state.data4.results[i].url.length - 1))] = this.state.data4.results[i].title + "";
                    }
                    console.log(allTitles);
                    console.log(indexes);
                    //console.log(titlesIndexes);
                    //console.log(map);
                    this.setState({map: map});
                    //localStorage.setItem("map", map);
                    console.log(this.state.map);

                    for (let j = 0; j < this.state.allFilms.length; j++) {
                        indexes.splice((this.state.allFilms[j]) - 1, 1);
                        console.log(indexes);
                    }
                    
                    console.log('все нужные индексы', indexes);

                    let userLogin = JSON.parse(localStorage.getItem('user'));

                    if (userLogin !== null && userLogin.username === "admin") {

                        const freeFilms = indexes.map((film, index) =>
                        <li className = 'directors-films__item' key={index + 100}>
                            <label className = 'directors-films__item-text' htmlFor={index + 100} onClick={this.onFreeFilmClick}>
                                <input className = 'directors-films__input' id={index + 100} type="checkbox" name="first"></input>
                                <span className = 'directors-films__span'>{this.state.map[film]}</span>
                                <h6 className = 'directors-films__index visually-hidden'>{indexes[index]}</h6>
                            </label>
                        </li>
                        );
                        this.setState({freeFilms: freeFilms});
                    } else {
                        const freeFilms = '';
                        this.setState({freeFilms: freeFilms});
                    }
                    
                }
            }
        }
    }

    onItemClick = (e) => {
        console.log('-------------------------------------------');
        console.log(e);
        let eventTag = "";
        
            sessionStorage.setItem("tar", e.target);
            this.setState({filmsList: []});
            this.setState({data2: []});
            console.log('Старые ссылки на фильмы', this.state.data2._embedded);
            document.querySelector('.directors-data').classList.remove('visually-hidden');
            if (document.querySelector('.directors-films')) {
                document.querySelector('.directors-films').classList.remove('visually-hidden');
            }
            if (document.querySelector('.directors__item--active')) {
                document.querySelector('.directors__item--active').classList.remove('directors__item--active');
            }
            
            
            if (e.target.classList == "directors__item") {
                eventTag = e.target;
            } else {
                eventTag = e.target.parentNode;
            }
        

        eventTag.classList.add('directors__item--active');
        const number = eventTag.querySelector('.directors__index').innerHTML;
        //console.log(number);
        this.setState({ index: number });
        //console.log(this.state.index);
        this.setState({ name: this.state.data._embedded.directors[number].name});
        this.setState({ born: this.state.data._embedded.directors[number].birthday});
        
        this.setState({ biography: this.state.data._embedded.directors[number].biography});
        
        let userLogin = JSON.parse(localStorage.getItem('user'));

        if (userLogin !== null && userLogin.username === "admin") {
          document.querySelector('.directors__delete-button').classList.remove('visually-hidden');
        }

        if (document.querySelector('.directors__add-button--active')) {
            document.querySelector('.directors-add').classList.add('visually-hidden');
            document.querySelector('.directors__add-button').classList.remove('directors__add-button--active');
        }
        sessionStorage.setItem("number", number);
        const lalala = sessionStorage.getItem("number", number);

        this.getRelAndChosenFilms(sessionStorage.getItem("number"));
    }

    onSaveClick = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        const URL = document.querySelectorAll('.directors__href')[this.state.index].innerHTML;
        const name = this.state.name;
        console.log('Имя', name);
        console.log(URL);
        let userLogin = JSON.parse(localStorage.getItem('user'));
        
        
        xhr.open('PUT', URL, true);
        const body = JSON.stringify({
            name: this.state.name,
            birthday: this.state.born,
            biography: this.state.biography
        });
        
        xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(body);
        xhr.send(body);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              console.log(xhr.status);
              if (xhr.status == 401 && userLogin.username === "admin") {
                console.log("no auth");
                window.getToken(URL, 'PUT');
                    
              } else {
                this.setState({ name: '' });
                this.setState({ born: '' });
                this.setState({ biography: '' });
                //document.querySelector('.directors__item--active').classList.remove('directors__item--active');
                const timeId = setInterval(this.callthebase, 400);
                setTimeout(function() {
                    clearInterval(timeId);
                    
                }, 900);

                const timing = setInterval(setTimeout(function() {
                    let directorNumber;
                    const count = document.querySelectorAll('.directors__item').length;
                    
                    const names = document.querySelectorAll('.directors__name');
                    console.log(names);
                    console.log('кол-во режиссеров', count);
                    for (let i = 0; i < names.length; i++) {
                        if (names[i].innerHTML === name) {
                            directorNumber = i;
                            console.log(directorNumber);
                        }
                    }
                    (document.querySelectorAll('.directors__item')[directorNumber]).click();
                    
                }, 900));
                setTimeout(function() {
                    clearInterval(timing);
                    
                }, 1000);
              }
            }
        }.bind(this)
        
        /*const timeId = setInterval(this.callthebase, 500);
        setTimeout(function() {
            clearInterval(timeId);
            
        }, 600);

        const time = setInterval(setTimeout(this.getRelAndChosenFilms(sessionStorage.getItem("number")), 600), 1000);
        setTimeout(function() {
            clearInterval(time);
            //this.onItemClick;
        }, 2100);*/

        

        
        
    }

    onDeleteClick = (e) => {
        e.preventDefault();
        this.getRelAndChosenFilms(sessionStorage.getItem("number"));

        console.log(localStorage.getItem("relFilms"));
        const array = localStorage.getItem('relFilms').split(',');
        console.log(array);

        if (array[0] !== '') {
            for (let j = 0; j < array.length; j++) {
                const xhr = new XMLHttpRequest();
                let URL = 'http://192.168.148.30:8554/api/v2/films/' + array[j];
                xhr.open('DELETE', URL, true);
                xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

                xhr.send();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        console.log(xhr.status);
                        if (xhr.status == 401 && userLogin.username === "admin") {
                            console.log("no auth");
                            window.getToken(URL, 'DELETE');
                                
                        } else {
                            
                        }
                    }
                }
            }
        }

        e.preventDefault();

        console.log(e);
        const URL = document.querySelectorAll('.directors__href')[this.state.index].innerHTML;
        console.log(URL);
        let userLogin = JSON.parse(localStorage.getItem('user'));

        const xhr = new XMLHttpRequest();
        //const index  = Number(e.target.querySelector('.index').innerHTML);
        console.log("-------------------------------------"); 
        console.log('URL for delete ', URL);
        xhr.open('DELETE', URL, true);

        console.log('token =', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        console.log('fresh = ', document.cookie.replace(/(?:(?:^|.*;\s*)fresh\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(xhr.status);
                if (xhr.status == 401 && userLogin.username === "admin") {
                    console.log("no auth");
                    window.getToken(URL, 'DELETE');
                        
                } else {
                    //let userLogin = JSON.parse(localStorage.getItem('user'));
                    document.querySelector('.directors-data').classList.add('visually-hidden');
                    document.querySelector('.directors__item--active').classList.remove('directors__item--active');
                    if (userLogin !== null) {
                        document.querySelector('.directors__delete-button').classList.add('visually-hidden');
                    }
                    if (document.querySelector('.directors-films')) {
                        document.querySelector('.directors-films').classList.add('visually-hidden');
                    }
                }
            }
        }

        const timeId = setInterval(this.callthebase, 1000);
    
        setTimeout(function() {
            clearInterval(timeId);
        }, 1100);
    }

    onSaveAddClick = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        const URL = 'http://192.168.148.30:8554/api/v2/directors';
        let userLogin = JSON.parse(localStorage.getItem('user'));
        
        
        xhr.open('POST', URL, true);
        const body = JSON.stringify({
            name: this.state.addName,
            birthday: this.state.addBorn,
            biography: this.state.addBiography
        });
        
        xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(body);
        xhr.send(body);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              console.log(xhr.status);
              if (xhr.status == 401 && userLogin.username === "admin") {
                console.log("no auth");
                window.getToken(URL, 'POST');
                    
              } else {
                this.setState({ addName: '' });
                this.setState({ addBorn: '' });
                this.setState({ addBiography: '' });
              }
            }
        }.bind(this)
        
        const timeId = setInterval(this.callthebase, 1000);
  
        setTimeout(function() {
            clearInterval(timeId);
        }, 1100);
        
    }

    onCloseClick = (e) => {
        let userLogin = JSON.parse(localStorage.getItem('user'));
        document.querySelector('.directors-data').classList.add('visually-hidden');
        if (document.querySelector('.directors-films')) {
            document.querySelector('.directors-films').classList.add('visually-hidden');
        }
        document.querySelector('.directors__item--active').classList.remove('directors__item--active');
        if (userLogin.username === "admin") {
          document.querySelector('.directors__delete-button').classList.add('visually-hidden');
        }
    }

    onCloseAddTableClick = (e) => {
        let userLogin = JSON.parse(localStorage.getItem('user'));
        document.querySelector('.directors-add').classList.add('visually-hidden');
        document.querySelector('.directors__add-button').classList.remove('directors__add-button--active');
    }

    onLoginClick = (e) => {
        localStorage.setItem("token", "null");
        document.cookie = "token=; path=/; expires=;";
        window.location.reload(true);
    }

    onFilmClick = (e) => {
        let eventTarget;
        console.log(e.target);
        
        if (e.target.classList == 'directors-films__input' || e.target.classList == 'directors-films__span' || e.target.classList == 'directors-films__item-text' || e.target == 'directors-films__inner-span') {
            eventTarget = e.target.parentNode;
            console.log(eventTarget);
            console.log('http://192.168.148.30:8554/api/v2/films/' + eventTarget.querySelector('.directors-films__index').innerHTML);
            //setTimeout(eventTarget.querySelector('.directors-films__input').disabled = true, 1000);
            localStorage.setItem("deleteFilm", 'http://192.168.148.30:8554/api/v2/films/' + eventTarget.querySelector('.directors-films__index').innerHTML);
        } else if (e.target.classList == 'directors-films__item') {
            eventTarget = e.target;
            console.log(eventTarget);
            console.log('http://192.168.148.30:8554/api/v2/films/' + eventTarget.querySelector('.directors-films__index').innerHTML);
            localStorage.setItem("deleteFilm", 'http://192.168.148.30:8554/api/v2/films/' + eventTarget.querySelector('.directors-films__index').innerHTML);
            //setTimeout(eventTarget.querySelector('.directors-films__input').disabled = true, 1000);
        } else if (e.target.classList == 'directors-films__inner-span') {
            eventTarget = e.target.parentNode.parentNode.parentNode;
            console.log(eventTarget);
            console.log('http://192.168.148.30:8554/api/v2/films/' + eventTarget.querySelector('.directors-films__index').innerHTML);
            localStorage.setItem("deleteFilm", 'http://192.168.148.30:8554/api/v2/films/' + eventTarget.querySelector('.directors-films__index').innerHTML);
            //setTimeout(eventTarget.querySelector('.directors-films__input').disabled = true, 1000);
        }

        if (eventTarget.querySelector('.directors-films__input').classList.contains('checked')) {
            return;
        }
        
        //console.log(eventTarget);
        const URL = localStorage.getItem("deleteFilm");
        console.log(URL);
        let userLogin = JSON.parse(localStorage.getItem('user'));

        

        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', URL, true);

        console.log('token =', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        console.log('fresh = ', document.cookie.replace(/(?:(?:^|.*;\s*)fresh\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(xhr.status);
                if (xhr.status == 401 && userLogin.username === "admin") {
                    console.log("no auth");
                    window.getToken(URL, 'DELETE');
                        
                } else {
                    //let userLogin = JSON.parse(localStorage.getItem('user'));
                    //this.getRelAndChosenFilms;
                    //this.setState({filmsList: ''});
                    //this.setState({freeFilms: ''});
                    eventTarget.querySelector('.directors-films__input').disabled = true;
                    eventTarget.querySelector('.directors-films__input').classList.add('checked');
                    //e.preventDefault();
                }
            }
        }

        

        if (document.querySelector('.directors-films')) {
            //document.querySelector('.directors-films').classList.add('visually-hidden');
        }
        //this.setState({filmsList: []}, this.getRelAndChosenFilms(sessionStorage.getItem("number")));
        //const time = setInterval(this.setState({filmsList: []}), 300);
        //setTimeout(function() {
            //clearInterval(time);
            //this.onItemClick;
        //}, 2000);

        
        
    }

    onUpdateClick = (e) => {
        const timeId = setInterval(this.callthebase, 500);
        setTimeout(function() {
            clearInterval(timeId);
        }, 600);

        const time = setInterval(setTimeout(this.getRelAndChosenFilms(sessionStorage.getItem("number")), 1000), 1000);
        setTimeout(function() {
            clearInterval(time);
            //this.onItemClick;
        }, 2100);
    }

    onFreeFilmClick = (e) => {
        //e.preventDefault();
        let eventTarget;
        console.log(e.target);
        if (e.target.classList == 'directors-films__input' || e.target.classList == 'directors-films__span' || e.target.classList == 'directors-films__item-text' || e.target == 'directors-films__inner-span') {
            eventTarget = e.target.parentNode;
            console.log(eventTarget);
            console.log(localStorage.setItem("dir", eventTarget.querySelector('.directors-films__index').innerHTML));
            localStorage.setItem("dir", eventTarget.querySelector('.directors-films__index').innerHTML);
            //eventTarget.querySelector('.directors-films__input').disabled = true;
        } else if (e.target.classList == 'directors-films__item') {
            eventTarget = e.target;
            console.log(eventTarget);
            console.log(localStorage.setItem("dir", eventTarget.querySelector('.directors-films__index').innerHTML));
            localStorage.setItem("dir", eventTarget.querySelector('.directors-films__index').innerHTML);
            //eventTarget.querySelector('.directors-films__input').disabled = true;
        } else if (e.target.classList == 'directors-films__inner-span') {
            eventTarget = e.target.parentNode.parentNode.parentNode;
            console.log(eventTarget);
            console.log(localStorage.setItem("dir", eventTarget.querySelector('.directors-films__index').innerHTML));
            localStorage.setItem("dir", eventTarget.querySelector('.directors-films__index').innerHTML);
            //eventTarget.querySelector('.directors-films__input').disabled = true;
        }

        if (eventTarget.querySelector('.directors-films__input').classList.contains('checked')) {
            return;
        }
        
        //console.log(eventTarget);
        const URL = 'http://192.168.148.30:8554/api/v2/films/';
        console.log(URL);
        let userLogin = JSON.parse(localStorage.getItem('user'));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', URL, true);

        console.log('dirId ', (document.querySelectorAll('.directors__href')[this.state.index].innerHTML).substring(44));

        const body = JSON.stringify({
            id: localStorage.getItem("dir", eventTarget.querySelector('.directors-films__index').innerHTML),
            directorId: (document.querySelectorAll('.directors__href')[this.state.index].innerHTML).substring(44)
        });

        console.log('token =', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        console.log('fresh = ', document.cookie.replace(/(?:(?:^|.*;\s*)fresh\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(body);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(xhr.status);
                if (xhr.status == 401 && userLogin.username === "admin") {
                    console.log("no auth");
                    window.getToken(URL, 'POST');
                } else {
                    //let userLogin = JSON.parse(localStorage.getItem('user'));
                    //this.getRelAndChosenFilms;
                    //this.setState({filmsList: ''});
                    //this.setState({freeFilms: ''});
                    eventTarget.querySelector('.directors-films__input').disabled = true;
                    eventTarget.querySelector('.directors-films__input').classList.add('checked');
                    //e.persist();
                    //e.preventDefault();
                }
            }
        }
    }

}

export default Directors;