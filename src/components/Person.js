import React from 'react';
//import ReactDOM from 'react-dom';
//import {render} from 'react-dom';

function changeSymbol(str) {
  if (str !== undefined) {
      const newstr = str.replace(/é/i, 'e');
      return newstr;
  }
}

class Person extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
          //user: '',
          //characters: [],
          //point: this.props.point //это счетчик - по нему вывожу следующий элемента массива
        }
      }

      componentWillreceiveProps() {
        this.setState({ user: this.props.user});
      }

      componentDidMount() {
        this._isMounted = true;
        const xhr = new XMLHttpRequest();
        //console.log('это новый url ', this.props.user);
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

	    renderOnePerson() {
        const { data } = this.state
        if (data !== undefined && this._isMounted) {

          
            

            return (
                <div className = 'person'>
                  <p className = 'person__name'><span className = 'person__elem'>[ </span><span className = 'person__link'>{data.name}</span><span className = 'person__elem'> ]</span></p>
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
                        <p className = 'person__text'>Eye color:</p>
                        <p className = 'person__text'>{data.eye_color}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'person__text'>Hair color:</p>
                        <p className = 'person__text'>{data.hair_color}</p>
                      </li>
                    </ul>
                    <div className = 'person__right-block'>
                      <img className = 'person__image' src={imgLoaded('http://localhost:7070/' + changeSymbol(data.name) + '.jpg')} alt=""></img>
                      
                    </div>
                  </div>
                </div>
              )
        }

        function imgLoaded() {
          while (data.name === undefined) {
            return 'http://localhost:7070/no-photo.png'
          }
          if (data.name !== undefined) {
            return 'http://localhost:7070/' + changeSymbol(data.name) + '.jpg'
          }
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