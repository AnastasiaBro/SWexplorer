import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
//import {render} from 'react-dom';
window.planet = 0;


class Planet extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
          elem: '',
          planets: []
        }
      }

      componentWillreceiveProps() {
        this.setState({ elem: this.props.elemToShow,  planets: this.props.planets});
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
        //console.log(window.personId);
        //const URL = 'https://swapi.co/api/people/';
        console.log(this.props.elem);
        xhr.open('GET', this.props.elem, true);
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
	renderOnePlanet(){
        const { data } = this.state
        if (data !== undefined) {
            

            return (
                <div className = 'person'>
                  <p className = 'planet__name'><span className = 'person__elem'>[ </span><a className = 'person__link' href={data.url}>{data.name}</a><span className = 'person__elem'> ]</span></p>
                  <div className = 'person__blocks'>
                    <ul className = 'person__left-block'>  
                      <li className = 'person__row'>
                        <p className = 'planet__text'>Rotation period:</p>
                        <p className = 'planet__text'>{data.rotation_period}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'planet__text'>Orbital period:</p>
                        <p className = 'planet__text'>{data.orbital_period}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'planet__text'>Diameter:</p>
                        <p className = 'planet__text'>{data.diameter}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'planet__text'>Climate:</p>
                        <p className = 'planet__text planet__text--wide'>{data.climate}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'planet__text'>Population:</p>
                        <p className = 'planet__text'>{data.population}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'planet__text'>Terrain:</p>
                        <p className = 'planet__text planet__text--wide'>{data.terrain}</p>
                      </li>
                    </ul>
                    <div className = 'planet__right-block'>
                      <img className = 'planet__image' src={'/img/' + data.name + '.jpg'} alt=""></img>
                      <div className = 'planet__button-container'>
                        <button className = 'person__button-left' type = 'button' onClick={this.planetLeftClick}><span className = 'visually-hidden'>left</span></button>
                        <button className = 'person__button-right' type = 'button' onClick={this.planetRightClick}><span className = 'visually-hidden'>right</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              )
        }
    }

    planetRightClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('second-window-line'));
      const arrLength = this.props.planets.length;
      console.log('было ', this.props.planets[window.point]);
      window.planet++;
      if (window.planet === Number(arrLength)) {
        window.planet = 0;
      }
      console.log('стало ', this.props.planets[window.planet]);
      render(<Planet elem={this.props.planets[window.planet]} planets={this.props.planets} />, document.getElementById('second-window-line'));
    }

    planetLeftClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('second-window-line'));
      const arrLength = this.props.planets.length;
      window.planet--;
      if (window.planet === -1) {
        window.planet = Number(arrLength) - 1;
      }
      console.log('стало ', this.props.planets[window.planet]);
      render(<Planet elem={this.props.planets[window.planet]} planets={this.props.planets} />, document.getElementById('second-window-line'));
    }
    
    render() {
        return (
          <div>
              {this.renderOnePlanet()}
          </div>
        )
      }
}

export default Planet;