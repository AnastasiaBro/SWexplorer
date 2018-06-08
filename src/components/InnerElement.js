import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
//import InnerElement from './InnerElement.js'
import './App.css'

class InnerElement extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
        }
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
        //console.log(this.props.name);
        //console.log(this.props.variant);
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
	renderName(){
        const { data } = this.state
        if (this.props.url.includes('films')) {
            console.log(this.props.url);
            return (<p className = 'card__text'><span className = 'card__link'>{data.title}</span></p>)
        } else {
            return (<p className = 'card__text'><span className = 'card__link'>{data.name}</span></p>)
        }
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