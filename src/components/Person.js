import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
//import {render} from 'react-dom';
window.point = 0;


class Person extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
          user: '',
          characters: []
        }
      }

      componentWillreceiveProps() {
        this.setState({ user: this.props.userToShow,  characters: this.props.characters});
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
        //console.log(window.personId);
        //const URL = 'https://swapi.co/api/people/';
        console.log(this.props.user);
        xhr.open('GET', this.props.user, true);
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
	renderOnePerson(){
        const { data } = this.state
        if (data !== undefined) {
            

            return (
                <div className = 'person'>
                  <p className = 'person__name'><span className = 'person__elem'>[ </span><a className = 'person__link' href={data.url}>{data.name}</a><span className = 'person__elem'> ]</span></p>
                  <div className = 'person__blocks'>
                    <ul className = 'person__left-block'>  
                      <li className = 'person__row'>
                        <p className = 'person__text'>Birth year:</p>
                        <p className = 'person__text'>{data.birth_year}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'person__text'>Height:</p>
                        <p className = 'person__text'>{data.height}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'person__text'>Mass:</p>
                        <p className = 'person__text'>{data.mass}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'person__text'>Hair color:</p>
                        <p className = 'person__text'>{data.hair_color}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'person__text'>Eye color:</p>
                        <p className = 'person__text'>{data.eye_color}</p>
                      </li>
                    </ul>
                    <div className = 'person__right-block'>
                      <img className = 'person__image' alt="photo"></img>
                      <div className = 'person__button-container'>
                        <button className = 'person__button-left' type = 'button' onClick={this.personLeftClick}><span className = 'visually-hidden'>left</span></button>
                        <button className = 'person__button-right' type = 'button' onClick={this.personRightClick}><span className = 'visually-hidden'>right</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              )
        }
    }

    personRightClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('first-window-line'));
      //console.log(this.props.characters);
      //console.log('было ', this.props.characters[window.point]);
      const arrLength = this.props.characters.length;
      //console.log(Number(arrLength) - 1);
      window.point++;
      if (window.point === Number(arrLength)) {
        window.point = 0;
      }
      console.log('стало ', this.props.characters[window.point]);
      render(<Person user={this.props.characters[window.point]} characters={this.props.characters} />, document.getElementById('first-window-line'));
    }

    personLeftClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('first-window-line'));
      const arrLength = this.props.characters.length;
      window.point--;
      if (window.point === -1) {
        window.point = Number(arrLength) - 1;
      }
      console.log('стало ', this.props.characters[window.point]);
      render(<Person user={this.props.characters[window.point]} characters={this.props.characters} />, document.getElementById('first-window-line'));
    }
    
    render() {
        return (
          <div>
              {this.renderOnePerson()}
          </div>
        )
      }
}

export default Person;