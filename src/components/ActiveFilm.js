import React, {Component} from 'react';


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
        const { data, isLoading } = this.state

		if (data.results !== undefined) { //проверка, что data.results загружен
            const results = [];  //данные
            const opening = [];  //чтобы абзацами вывести титры

            for (var i = 0; i < this.state.data.results.length; i++) {
                results[i] = this.state.data.results[i];
                opening[i] = this.state.data.results[i].opening_crawl.split('\r\n');
            }

            console.log(opening);

            const listOpening = opening[window.id].map((results, index) =>
                <li className = 'film__opening' key={index}>{opening[window.id][index]}<span className = 'transparent'>space</span></li>
            );
			return (
				<div>
                      <div className = 'film__logo-left'>
                        <ul className = 'film__opening-list'>{listOpening}</ul>
                      </div>
                      <div className = 'film__logo-right'>
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
                            <p className = 'film__logo-right-text film__logo-right-text--appear'>loading...</p>
                          </div>
                          <div className = 'film__logo-row'>
                            <p className = 'film__logo-right-text'>Planets:</p>
                            <p className = 'film__logo-right-text film__logo-right-text--appear'>loading...</p>
                          </div>
                        </div>
                      </div>
                </div>
                )
            }else{
                return (
                    <h3>Данных нет.</h3>
            )
		}
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