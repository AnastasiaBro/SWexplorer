import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import Person from './Person.js';
import Planet from './Planet.js';
//window.personId = 0;

class ActiveFilm extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
          point: null,
          planetPoint: null
        }
      }
      componentDidMount() {
        const xhr = new XMLHttpRequest();
        const URL = 'https://swapi.co/api/films';
        xhr.open('GET', URL, true);
        //console.log(window.id);
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
              point: 0,
              planetPoint: 0
            })
          }
        }
      }
	renderOneFilm(){
        const { data } = this.state

		if (data.results !== undefined) { //проверка, что data.results загружен
            const results = [];  //данные
            const opening = [];  //чтобы абзацами вывести титры

            for (var i = 0; i < this.state.data.results.length; i++) {
                results[i] = this.state.data.results[i];
                opening[i] = this.state.data.results[i].opening_crawl.split('\r\n');
            }

            //const userToShow = this.state.data.results[window.id].characters[0];
            //const elemToShow = this.state.data.results[window.id].planets[0];
            //const allCharacters = this.state.data.results[window.id].characters;
            //const allPlanets = this.state.data.results[window.id].planets;
            //console.log(userToShow);

            const listOpening = opening[window.id].map((results, index) =>
                <li className = 'film__opening' key={index}>{opening[window.id][index]}<span className = 'transparent'>.</span></li>
            );

            //const listCharacters = results[window.id].characters.map((characters, index) =>
                //<li className = 'character__item character__link' key={index}><span className = 'character__span visually-hidden'>{characters.replace(/\D+/g,"")}</span>{characters.replace(/\D+/g,"")}</li>
            //);

            //const listPlanets = results[window.id].planets.map((planets, index) =>
                //<li className = 'character__item' key={index}><a className = 'character__link' href={planets}>{planets.replace(/\D+/g,"")}</a></li>
            //);
            
            //<ul className = 'film__people-list character' id = 'people' onClick={this.personClick}>{listCharacters}</ul>
			return (
				  <div>
            <img className = 'film__logo-central' src='http://localhost:7070/logo-star2.png' alt='logo'></img>
            <div className = 'film__logo-left'>
              <ul className = 'film__opening-list'>{listOpening}</ul>
              
            </div>
            
            <div className = 'film__logo-right'>
              <div className = 'film__first-window visually-hidden' id='first-window'>
                <div className = 'film__window-container'>
                  <p className = 'film__title-people'>Character card</p>
                  <button className="film__close-button" onClick={this.closePeopleList}><span className = 'visually-hidden'>close</span></button>
                  <div className = 'film__button-container'>
                    <button className = 'film__button-left' type = 'button' onClick={this.personLeftClick}><span className = 'visually-hidden'>left</span></button>
                    <button className = 'film__button-right' type = 'button' onClick={this.personRightClick}><span className = 'visually-hidden'>right</span></button>
                  </div>
                </div>
                
                <div id = 'first-window-line'></div>
              </div>
              
              <div className = 'film__second-window visually-hidden' id='second-window'>
                <div className = 'film__window-container'>
                  <p className = 'film__title-people'>Planet card</p>
                  <button className="film__close-button" onClick={this.closePlanetsList}><span className = 'visually-hidden'>close</span></button>
                  <div className = 'film__planet-button-container'>
                    <button className = 'film__planet-button-left' type = 'button' onClick={this.planetLeftClick}><span className = 'visually-hidden'>left</span></button>
                    <button className = 'film__planet-button-right' type = 'button' onClick={this.planetRightClick}><span className = 'visually-hidden'>right</span></button>
                  </div>
                </div>
                
                <div id = 'second-window-line'></div>
              </div>

              <div className = 'film__logo-container'>
                <div className = 'film__logo-row'>
                  <p className = 'film__logo-right-text'>Episode number:</p>
                  <p className = 'film__logo-right-text film__logo-right-text--appear'>{results[window.id].episode_id}</p>
                </div>
                <div className = 'film__logo-row'>
                  <p className = 'film__logo-right-text'>Director:</p>
                  <p className = 'film__logo-right-text film__logo-right-text--appear'>{results[window.id].director}</p>
                </div>
                <div className = 'film__logo-row'>
                  <p className = 'film__logo-right-text'>Release date:</p>
                  <p className = 'film__logo-right-text film__logo-right-text--appear'>{results[window.id].release_date.substring(0,4)}</p>
                </div>
                <div className = 'film__logo-row'>
                  <p className = 'film__logo-right-text'>Characters:</p>
                  <p className = 'film__logo-right-text film__logo-right-text--appear'><span className = 'film__link' onClick={this.peopleClick}>Open a card</span></p>
                </div>
                <div className = 'film__logo-row'>
                  <p className = 'film__logo-right-text'>Planets:</p>
                  <p className = 'film__logo-right-text film__logo-right-text--appear'><span className = 'film__link' onClick={this.planetsClick}>Open a card</span></p>
                </div>
              </div>
            </div>
          </div>
          )
      }
    }

    peopleClick = (e) => {
      this.state.point = 0;
      document.querySelector('.film__first-window').classList.remove('visually-hidden');
      document.querySelector('.film__second-window').classList.add('visually-hidden');
      console.log(window.id);
      console.log(this.state.data.results[window.id].characters);
      
      console.log(this.state.point);

      render(<Person user={this.state.data.results[window.id].characters[0]} characters={this.state.data.results[window.id].characters} point={this.state.point} />, document.getElementById('first-window-line'));
    }

    closePeopleList = (e) => {
      document.querySelector('.film__first-window').classList.add('visually-hidden');
    }

    planetsClick = (e) => {
      this.state.planetPoint = 0;
      document.querySelector('.film__second-window').classList.remove('visually-hidden');
      document.querySelector('.film__first-window').classList.add('visually-hidden');
      console.log(window.id);
      console.log(this.state.data.results[window.id].planets);

      console.log(this.state.planetPoint);

      render(<Planet elem={this.state.data.results[window.id].planets[0]} planets={this.state.data.results[window.id].planets} planetPoint={this.state.planetPoint} />, document.getElementById('second-window-line'));
    }

    closePlanetsList = (e) => {
      document.querySelector('.film__second-window').classList.add('visually-hidden');
    }

    personRightClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('first-window-line'));
      const arrLength = this.state.data.results[window.id].characters.length;
      console.log('было', this.state.point);
      
      if ((this.state.point + 1) === Number(arrLength)) {
        this.state.point = 0;
      } else {
        this.state.point = this.state.point + 1;
      }
      console.log('стало', this.state.point);

      render(<Person user={this.state.data.results[window.id].characters[this.state.point]} />, document.getElementById('first-window-line'));
    }

    personLeftClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('first-window-line'));
      const arrLength = this.state.data.results[window.id].characters.length;
      console.log('было', this.state.point);

      if ((this.state.point - 1) === -1) {
        this.state.point = Number(arrLength) - 1;
      } else {
        this.state.point = this.state.point -1;
      }
      console.log('стало', this.state.point);
      
      render(<Person user={this.state.data.results[window.id].characters[this.state.point]} />, document.getElementById('first-window-line'));
    }

    planetRightClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('second-window-line'));
      const arrLength = this.state.data.results[window.id].planets.length;
      console.log('было', this.state.planetPoint);
      if ((this.state.planetPoint + 1) === Number(arrLength)) {
        this.state.planetPoint = 0;
      } else {
        this.state.planetPoint = this.state.planetPoint + 1;
        console.log('state ' + this.state.planetPoint);
        console.log('props ' + this.props.planetPoint);
      }
      console.log('стало', this.state.planetPoint);

      render(<Planet elem={this.state.data.results[window.id].planets[this.state.planetPoint]} />, document.getElementById('second-window-line'));
    }

    planetLeftClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('second-window-line'));
      const arrLength = this.state.data.results[window.id].planets.length;
      console.log('было', this.state.planetPoint);
      if ((this.state.planetPoint - 1) === -1) {
        this.state.planetPoint = Number(arrLength) - 1;
      } else {
        this.state.planetPoint = this.state.planetPoint -1;
      }
      console.log('стало', this.state.planetPoint);

      render(<Planet elem={this.state.data.results[window.id].planets[this.state.planetPoint]} />, document.getElementById('second-window-line'));
    }
    
    render() {
      return (
        <div className = 'film__appear visually-hidden' id = 'logo-container'>
            {this.renderOneFilm()}
        </div>
      )
    }
}

export default ActiveFilm;