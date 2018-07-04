import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
//import InnerElement from './InnerElement.js';
import ElementCard from './ElementCard.js';
import './App.css';

/*function funcForDroid() {
  if (this.props.url === 'undefined') {
    return 'unknown';
  }
}*/

function stroke(str) {
  const newStroke = str.substring(21, 23);
    switch(newStroke) {
      case 'pe':  return 'people';
        break;

      case 'pl':  return 'planets';
        break;

      case 'st':  return 'starships';
        break;

      case 've':  return 'vehicles';
        break;

      case 'sp':  return 'species';
        break;

      case 'fi':  return 'films';
        break;
    } 
}

class InnerElement extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
        }
      }

      componentDidMount() {
        if (this.props.url !== null) {
          const xhr = new XMLHttpRequest();
          //console.log(this.props.name);
          //console.log(this.props.variant);
          //console.log(this.props.url);
          xhr.open('GET', this.props.url, true);
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
      }

	  renderName(){
        const { data } = this.state
          //console.log(this.props.url);
          if (this.props.url === null) {
            return (<p className = 'card__text'><span className = 'card__link'></span></p>);
          }
          if (this.props.url.includes('films')) {
              //console.log(this.props.url);
              return (<p className = 'card__text'><span className = 'card__link' onClick={this.onNameClick}>{data.title}</span></p>)
          } else {
              return (<p className = 'card__text'><span className = 'card__link' onClick={this.onNameClick}>{data.name}</span></p>)
          }
    }

    onNameClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('element'));
      //const value = e.target.innerHTML;
      //document.querySelector('.search__input').value = value;
      //ReactDOM.unmountComponentAtNode(document.getElementById('search'));
      render(<ElementCard name={e.target.innerHTML} variant={stroke(this.props.url)} />, document.getElementById('element'));
    }
    
    render() {
        return (
          <div>
              {this.renderName()}
          </div>
        )
      }
}

export default InnerElement;