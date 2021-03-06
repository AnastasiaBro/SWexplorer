import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import ElementCard from './ElementCard.js'
import './App.css'

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
        this._isMounted = true;
        const xhr = new XMLHttpRequest();
        //console.log(this.props.name);
        xhr.open('GET', 'https://swapi.dev/api/' + this.props.variant + '/?search=' + this.props.name, true);
        xhr.send();
        this.setState({ isLoading: true })
    
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== 4) {
            return false
          }
    
          if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText)
          } else {
            if (this._isMounted) {
              this.setState({
                data: JSON.parse(xhr.responseText),
                isLoading: false,
              })
            }
          }
        }
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

	    renderOneElement(){
        const { data } = this.state
        if (data.results !== undefined && this._isMounted) {
            //const names = [];  //данные
            //const urls = [];
            const results = [];

            

            for (var i = 0; i < this.state.data.results.length; i++) {
                //names[i] = this.state.data.results[i].name;
                //urls[i] = this.state.data.results[i].url;
                results[i] = this.state.data.results[i];
            }
            //console.log(names);
            
            if (this.props.variant === 'films') {
              const filmList = results.map((item, index) =>
                <li className = 'element__name element__link' key={index} onClick={this.onElementClick}>{item.title}</li>
              );

              return (
                
                  <div className = 'element__container'>
                    <ul className = 'element__list'>{filmList}</ul>
                  </div>
                
              )
            } else {
              const peopleList = results.map((item, index) =>
                  <li className = 'element__name element__link' key={index} onClick={this.onElementClick}>{item.name}</li>
              );

              return (
                  
                    <div className = 'element__container'>
                      <ul className = 'element__list'>{peopleList}</ul>
                    </div>
                  
              )
            }
        }
    }

    onElementClick = (e) => {
        //console.log(e.target);
        ReactDOM.unmountComponentAtNode(document.getElementById('element'));
        const value = e.target.innerHTML;
        document.querySelector('.search__input').value = value;
        ReactDOM.unmountComponentAtNode(document.getElementById('search'));
        render(<ElementCard name={e.target.innerHTML} variant={this.props.variant} />, document.getElementById('element'));
    }
    
    render() {
        return (
          <div className = 'element'>
              {this.renderOneElement()}
          </div>
        )
      }
}

export default Search;
