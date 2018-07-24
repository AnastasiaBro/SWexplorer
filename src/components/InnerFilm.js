import React from 'react';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import FilmsChoose from './FilmsChoose';
//import { Link } from 'react-router-dom';

//import ReactDOM from 'react-dom';
//import {render} from 'react-dom';

class InnerFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            number: '',
            url: ''
        };
    }

    componentWillreceiveProps() {
        this.setState({ number: this.props.index});
    }

    callthebase = () => {
        const xhr = new XMLHttpRequest();
        
        const URL = 'https://swapi.co/api/films/' + this.props.url;
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

    componentDidMount() {
        this.callthebase();
    }

    renderFilm() {
        const { data } = this.state;
        if (data.title !== undefined) {
            console.log(data.title);
            return (
                <span className='directors-films__inner-span'>{data.title}</span>
            )
        }
    }

    render() {

        return (
            <span className='directors-films__inner-span'>
            {this.renderFilm()}
            </span>
        )
        
    }
}

export default InnerFilm;