import React from 'react';
import {render} from 'react-dom';


class People extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
        }
      }
      componentDidMount() {
        const xhr = new XMLHttpRequest();
        const URL = 'https://swapi.co/api/people';
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
	renderRelatedPeople(){
        const { data, isLoading } = this.state

		if (data.results !== undefined) { //проверка, что data.results загружен
            const people = [];  //данные

            for (var i = 0; i < this.state.data.results.length; i++) {
                people[i] = this.state.data.results[i].name;
            }

            const listCharacters = people.map((characters, index) =>
                <li className = 'character__item' key={index}><a href={characters}>{}</a></li>
            );
			return (
				<div>
                  {listCharacters}
                </div>
            )
      }
    }
    
    render() {
        return (
          <div className = 'people'>
              {this.renderRelatedPeople()}
          </div>
        )
      }
}

export default People;