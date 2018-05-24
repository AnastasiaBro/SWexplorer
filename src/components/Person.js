import React from 'react';
//import {render} from 'react-dom';


class Person extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
        }
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
        console.log(window.personId);
        const URL = 'https://swapi.co/api/people/' + window.personId;
        console.log(URL);
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
	renderOnePerson(){
        const { data } = this.state
        if (data !== undefined) {
            

            return (
                <div>
                  <p className = 'person__name'><span className = 'person__elem'>[ </span><a className = 'person__link' href={data.url}>{data.name}</a><span className = 'person__elem'> ]</span></p>
                  <div className = 'person__row'>
                    <p className = 'person__text'>Birth year:</p>
                    <p className = 'person__text'>{data.birth_year}</p>
                  </div>
                  <div className = 'person__row'>
                    <p className = 'person__text'>Height:</p>
                    <p className = 'person__text'>{data.height}</p>
                  </div>
                  <div className = 'person__row'>
                    <p className = 'person__text'>Mass:</p>
                    <p className = 'person__text'>{data.mass}</p>
                  </div>
                  <div className = 'person__row'>
                    <p className = 'person__text'>Hair color:</p>
                    <p className = 'person__text'>{data.hair_color}</p>
                  </div>
                  <div className = 'person__row'>
                    <p className = 'person__text'>Eye color:</p>
                    <p className = 'person__text'>{data.eye_color}</p>
                  </div>
                </div>
              )
        }
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