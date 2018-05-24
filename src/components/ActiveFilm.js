import React from 'react';
import {render} from 'react-dom';
import Person from './Person.js';
window.personId = 0;


class ActiveFilm extends React.Component {
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
	renderOneFilm(){
        const { data } = this.state

		if (data.results !== undefined) { //проверка, что data.results загружен
            const results = [];  //данные
            const opening = [];  //чтобы абзацами вывести титры

            for (var i = 0; i < this.state.data.results.length; i++) {
                results[i] = this.state.data.results[i];
                opening[i] = this.state.data.results[i].opening_crawl.split('\r\n');
            }

            //console.log(opening);

            const listOpening = opening[window.id].map((results, index) =>
                <li className = 'film__opening' key={index}>{opening[window.id][index]}<span className = 'transparent'>space</span></li>
            );

            const listCharacters = results[window.id].characters.map((characters, index) =>
                <li className = 'character__item character__link' key={index}><span className = 'character__span visually-hidden'>{characters.replace(/\D+/g,"")}</span>{characters.replace(/\D+/g,"")}</li>
            );

            const listPlanets = results[window.id].planets.map((planets, index) =>
                <li className = 'character__item' key={index}><a className = 'character__link' href={planets}>{planets.replace(/\D+/g,"")}</a></li>
            );
            
            //<ul className = 'film__people-list character' id = 'people' onClick={this.personClick}>{listCharacters}</ul>
			return (
				  <div>
            <div className = 'film__logo-left'>
              <ul className = 'film__opening-list'>{listOpening}</ul>
              
            </div>
            
            <div className = 'film__logo-right'>
              <div className = 'film__first-window visually-hidden' id='first-window'>
                <div className = 'film__window-container'>
                  <p className = 'film__title-people'>Character card</p>
                  <button className="film__close-button" onClick={this.closePeopleList}><span className = 'visually-hidden'>close</span></button>
                </div>
                
                <div id = 'first-window-line'></div>
              </div>
              
              <div className = 'film__second-window visually-hidden'>
                <div className = 'film__window-container'>
                  <p className = 'film__title-people'>Planet card</p>
                  <button className="film__close-button" onClick={this.closePlanetsList}><span className = 'visually-hidden'>close</span></button>
                </div>
                <p className = 'film__title-people film__title-people--small'>Click one to see planet</p>
                <ul className = 'film__people-list character' id = 'people'>{listPlanets}</ul>
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
                  <p className = 'film__logo-right-text film__logo-right-text--appear'><span className = 'film__link' onClick={this.peopleClick}>Open a list</span></p>
                </div>
                <div className = 'film__logo-row'>
                  <p className = 'film__logo-right-text'>Planets:</p>
                  <p className = 'film__logo-right-text film__logo-right-text--appear'><span className = 'film__link' onClick={this.planetsClick}>Open a list</span></p>
                </div>
              </div>
            </div>
          </div>
          )
      }
    }

    peopleClick = (e) => {
      document.querySelector('.film__first-window').classList.remove('visually-hidden');
      document.querySelector('.film__second-window').classList.add('visually-hidden');
      //if (e.target.className === 'character__item character__link') {
        //window.personId = e.target.querySelector('.character__span').innerText; //номер элемента
        //console.log(e.target);
        //console.log(window.personId);
      window.personId = (this.state.data.results[window.id].characters[0].replace(/\D+/g,""));
      render(<Person url="https://swapi.co/api/people/" reset={() => this.forceUpdate()} />, document.getElementById('first-window-line'));
      //}
    }

    closePeopleList = (e) => {
      document.querySelector('.film__first-window').classList.add('visually-hidden');
    }

    planetsClick = (e) => {
      document.querySelector('.film__second-window').classList.remove('visually-hidden');
      document.querySelector('.film__first-window').classList.add('visually-hidden');
    }

    closePlanetsList = (e) => {
      document.querySelector('.film__second-window').classList.add('visually-hidden');
    }

    personClick = (e) => {
      
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