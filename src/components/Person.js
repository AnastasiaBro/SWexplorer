import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';


class Person extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
          //user: '',
          //characters: [],
          point: this.props.point //это счетчик - по нему вывожу следующий элемента массива
        }
      }

      componentWillreceiveProps() {
        //this.setState({ user: this.props.user,  characters: this.props.characters, point: this.props.point});
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
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

          function changeSymbol(str) {
            if (str !== undefined) {
                const newstr = str.replace(/é/i, 'e');
                return newstr;
            }
          }
            

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
                        <p className = 'person__text'>Eye color:</p>
                        <p className = 'person__text'>{data.eye_color}</p>
                      </li>
                      <li className = 'person__row'>
                        <p className = 'person__text'>Hair color:</p>
                        <p className = 'person__text'>{data.hair_color}</p>
                      </li>
                    </ul>
                    <div className = 'person__right-block'>
                      <img className = 'person__image' src={'./img/' + changeSymbol(data.name) + '.jpg'} alt=""></img>
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
      const arrLength = this.props.characters.length;
      
      if ((this.state.point + 1) === Number(arrLength)) {
        this.state.point = 0;
      } else {
        this.state.point = this.state.point + 1;
      }

      render(<Person user={this.props.characters[this.state.point]} characters={this.props.characters} point={this.state.point} />, document.getElementById('first-window-line'));
    }

    personLeftClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('first-window-line'));
      const arrLength = this.props.characters.length;

      if ((this.state.point - 1) === -1) {
        this.state.point = Number(arrLength) - 1;
      } else {
        this.state.point = this.state.point -1;
      }
      
      render(<Person user={this.props.characters[this.state.point]} characters={this.props.characters} point={this.state.point} />, document.getElementById('first-window-line'));
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