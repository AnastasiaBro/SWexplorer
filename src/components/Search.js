import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';

class Search extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
          name: ''
        }
      }

      componentWillreceiveProps() {
        this.setState({ name: this.props.name});
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
        console.log(this.props.name);
        xhr.open('GET', 'https://swapi.co/api/species/?search=' + this.props.name, true);
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
	renderOneElement(){
        const { data } = this.state
        if (data.results !== undefined) {
            const names = [];  //данные
            const urls = [];
            const results = [];

            for (var i = 0; i < this.state.data.results.length; i++) {
                names[i] = this.state.data.results[i].name;
                urls[i] = this.state.data.results[i].url;
                results[i] = this.state.data.results[i];
            }
            console.log(names);

            const peopleList = results.map((item, index) =>
                <li className = 'person__name' key={index}><a className = 'person__link' href={item.url}>{item.name}</a></li>
            );

            return (
                <div className = 'person'>
                  <ul className = 'person__container'>{peopleList}</ul>
                </div>
              )
        }
    }
    
    render() {
        return (
          <div>
              {this.renderOneElement()}
          </div>
        )
      }
}

export default Search;