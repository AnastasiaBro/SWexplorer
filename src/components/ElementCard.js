import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
//import ElementCard from './ElementCard.js'

class ElementCard extends React.Component {
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
        console.log(this.props.variant);
        xhr.open('GET', 'https://swapi.co/api/' + this.props.variant + '/?search=' + this.props.name, true);
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
	renderElement(){
        const { data } = this.state
        if (data.results !== undefined) {
            console.log(data.results[0].name);
            return (
                
                  <div className = 'card__container'>
                    <p className = 'card__name'>{data.results[0].name}</p>
                  </div>
                
              )
        }
    }
    
    render() {
        return (
          <div className = 'element'>
              {this.renderElement()}
          </div>
        )
      }
}

export default ElementCard;