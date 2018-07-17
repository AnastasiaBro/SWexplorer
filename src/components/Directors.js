import React from 'react';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import Header from './Header';
import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom';
import {render} from 'react-dom';

//import { userActions } from './_actions';

//const directors = [{"name": "George Lucas", "date": "May 14, 1944", "birthplace": "Modesto, California, U.S.", "biography": ""}, {"name": "Richard Marquand", "date": "Sept. 22, 1937", "birthplace": "Llanishen, Cardiff, Wales", "biography": ""}, {"name": "Irvin Kershner", "date": "Apr. 29, 1923", "birthplace": "Philadelphia, Pennsylvania, U.S.", "biography": ""}, {"name": "J. J. Abrams", "date": "June 27, 1966", "birthplace": "New York City, New York, U.S.", "biography": ""}];


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
            data: []
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

    componentDidMount() {
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
      }

    onChangeName(e) {
        var val = e.target.value;
        this.setState({name: val});
    }

    onChangeBorn(e) {
        var val = e.target.value;
        this.setState({born: val});
    }

    onChangePlace(e) {
        var val = e.target.value;
        this.setState({place: val});
    }

    onChangeBiography(e) {
        var val = e.target.value;
        this.setState({biography: val});
    }

    onChangeAddName(e) {
        var val = e.target.value;
        this.setState({addName: val});
    }

    onChangeAddBorn(e) {
        var val = e.target.value;
        this.setState({addBorn: val});
    }

    onChangeAddPlace(e) {
        var val = e.target.value;
        this.setState({addPlace: val});
    }

    onChangeAddBiography(e) {
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
              <img className = 'directors__image' src={'http://localhost:7070/' + director.name + '.jpg'} alt="director"></img>
              <p className = 'directors__item-text'>{director.name}</p>
              <h6 className = 'directors__index visually-hidden'>{index}</h6>
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

      if (userLogin !== null) {

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
                                  <button className="directors__button directors__delete-button visually-hidden">Delete</button>
                                  <button className="directors__button directors-data__button" onClick={this.onSaveClick}>Save changes</button>
                              </div>

                          </div>

                          <div className="directors-add visually-hidden">
                              <div className="directors-data__row directors-data__row--wide">
                                  <p className="directors-data__text">Add a new director:</p>
                                  <button className="directors-add__close" onClick={this.onCloseAddTableClick}><span className="visually-hidden">Close</span></button>
                              </div>
                              <div className="directors-data__list">
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="addName">Name:</label>
                                      <input className="directors-data__item-input" type="text" placeholder="Name" value={this.state.addName} onChange={this.onChangeAddName} name="addName" id="addName"/>
                                  </div>
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="addBorn">Birthday:</label>
                                      <input className="directors-data__item-input" type="text" placeholder="16 Apr. 1980" value={this.state.addBorn} onChange={this.onChangeAddBorn} name="addBorn" id="addBorn"/>
                                  </div>
                                  <div className="directors-data__row">
                                      <label className="directors-data__item-text directors-data__item-label" htmlFor="addBiography">Biography:</label>
                                      <textarea className="directors-data__item-input directors-data__item-textarea" type="text" value={this.state.addBiography} placeholder="Many years ago..." onChange={this.onChangeAddBiography} name="addBiography" id="addBiography"/>
                                  </div>
                              </div>
                              <button className="directors-add__save" onClick={this.onSaveAddClick}>Save changes</button>
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
                        <Link className="home-page__logout" onClick={this.onLoginClick} to='/logout'>Login</Link>
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
                                        <p className="directors-data__item-text--no-user" htmlFor="born">Born:</p>
                                        <p className="directors-data__item-text--no-user">{this.state.born}</p>
                                    </div>
                                    <div className="directors-data__row">
                                        <p className="directors-data__item-text--no-user" htmlFor="birthplace">Birthplace:</p>
                                        <p className="directors-data__item-text--no-user">{this.state.place}</p>
                                    </div>
                                    <div className="directors-data__row">
                                        <p className="directors-data__item-text--no-user">Biography:</p>
                                        <p className="directors-data__item-text--no-user directors-data__item-text--wide">{this.state.biography}</p>
                                    </div>
                                    
                                </div>
  
                            </div>
  
                        </div>
  
                        <div className="blocks">
                            
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
            document.querySelector('.directors__item--active').classList.remove('directors__item--active');
        }
    }

    onItemClick = (e) => {
        document.querySelector('.directors-data').classList.remove('visually-hidden');
        if (document.querySelector('.directors__item--active')) {
            document.querySelector('.directors__item--active').classList.remove('directors__item--active');
        }
        //console.log(e.target.classList);
        if (e.target.classList == "directors__item") {
            const eventTag = e.target;
            eventTag.classList.add('directors__item--active');
            const number = eventTag.querySelector('.directors__index').innerHTML;
            console.log(number);
            this.setState({ index: number });
            console.log(this.state.index);
            this.setState({ name: this.state.data._embedded.directors[number].name});
            this.setState({ born: this.state.data._embedded.directors[number].birthday});
            //this.setState({ place: this.state.data._embedded.directors[number].birthplace});
            this.setState({ biography: this.state.data._embedded.directors[number].biography});
            //document.querySelector('.directors__delete-button').classList.remove('visually-hidden');
        } else {
            const eventTag = e.target.parentNode;
            eventTag.classList.add('directors__item--active');
            const number = eventTag.querySelector('.directors__index').innerHTML;
            console.log(number);
            this.setState({ index: number });
            console.log(this.state.index);
            this.setState({ name: this.state.data._embedded.directors[number].name});
            this.setState({ born: this.state.data._embedded.directors[number].birthday});
            //this.setState({ place: this.state.data._embedded.directors[number].birthplace});
            this.setState({ biography: this.state.data._embedded.directors[number].biography});
            //document.querySelector('.directors__delete-button').classList.remove('visually-hidden');
        }
        let userLogin = JSON.parse(localStorage.getItem('user'));

        if (userLogin !== null) {
          document.querySelector('.directors__delete-button').classList.remove('visually-hidden');
        }

        if (document.querySelector('.directors__add-button--active')) {
            document.querySelector('.directors-add').classList.add('visually-hidden');
            document.querySelector('.directors__add-button').classList.remove('directors__add-button--active');
        }
    }

    onSaveClick = (e) => {
        window.location.reload(true);
    }

    onSaveAddClick = (e) => {
        this.setState({addName: ''});
        this.setState({addBorn: ''});
        this.setState({addPlace: ''});
        this.setState({addBiography: ''});
        window.location.reload(true);
    }

    onCloseClick = (e) => {
        let userLogin = JSON.parse(localStorage.getItem('user'));
        document.querySelector('.directors-data').classList.add('visually-hidden');
        document.querySelector('.directors__item--active').classList.remove('directors__item--active');
        if (userLogin !== null) {
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
}

export default Directors;