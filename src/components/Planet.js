import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
//import {render} from 'react-dom';
//window.planet = 0;


class Planet extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false
          //elem: this.props.elem,
          //planets: [],
          //planetPoint: this.props.planetPoint //это счетчик - по нему вывожу следующий элемента массива
        }
      }

      componentWillreceiveProps() {
        this.setState({ elem: this.state.elem });
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
        //console.log(window.personId);
        //const URL = 'https://swapi.co/api/people/';
        console.log('это новый url ', this.props.elem);
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
            console.log('HERE');
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
                      <img className = 'planet__image' src={'http://localhost:7070/' + data.name + '.jpg'} alt=""></img>
                    </div>
                  </div>
                </div>
              )
        }
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