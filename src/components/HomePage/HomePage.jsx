import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './../Header';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';

import { userActions } from '../_actions';

function logoutClick (e) {
    //document.querySelector('.body-style').classList.remove('bg-films');
    window.location.reload(true);
}

const directors = [{"name": "George Lucas", "date": "May 14, 1944", "birthplace": "Modesto, California, U.S.", "biography": ""}, {"name": "Richard Marquand", "date": "Sept. 22, 1937", "birthplace": "Llanishen, Cardiff, Wales", "biography": ""}, {"name": "Irvin Kershner", "date": "Apr. 29, 1923", "birthplace": "Philadelphia, Pennsylvania, U.S.", "biography": ""}, {"name": "J. J. Abrams", "date": "June 27, 1966", "birthplace": "New York City, New York, U.S.", "biography": ""}];

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            born: "",
            place: "",
            biography: "",
            name: ""
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBorn = this.onChangeBorn.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeBiography = this.onChangeBiography.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    onChangeName(e) {
        var val = e.target.value;
        this.setState({name: val});
    }

    onChangeBorn(e) {
        var val = e.target.value;
        this.setState({born: val});
    }

    onChangePlace(e) {
        var val = e.target.value;
        this.setState({place: val});
    }

    onChangeBiography(e) {
        var val = e.target.value;
        this.setState({biography: val});
    }

    render() {
        
        const { user, users } = this.props;
        //window.welcomeName = user.firstName;
        document.location.replace('/');

        const header = document.querySelector('#header');
        document.location.replace('/');
        //header.querySelector('.home-page__title').classList.remove('visually-hidden');
        //header.querySelector('.home-page__text--blue').innerHTML = user.firstName + "!";
        //header.querySelector('.home-page__logout').innerHTML = "Logout";
        //header.querySelector('.home-page__logout').href = "/login";
        
        /*const usersList = directors.map((director, index) =>
            <li className = 'directors__item' key={index} onClick={this.onItemClick}>
                <img className = 'directors__image' src={'http://localhost:7070/' + director.name + '.jpg'} alt="director"></img>
                <p className = 'directors__item-text'>{director.name}</p>
                <h6 className = 'directors__index visually-hidden'>{index}</h6>
            </li>
        );*/

        return (
            <div>
                <div className="home-page">

                    <div className="visually-hidden">
                        <h3 className="home-page__title">All users:</h3>
                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items &&
                            <ul>
                                {users.items.map((user, index) =>
                                    <li key={user.id}>
                                        {user.firstName + ' ' + user.lastName}
                                    </li>
                                )}
                            </ul>
                        }
                    </div>
                    
                </div>
            </div>
            
        );
        
    }

    onAddClick = (e) => {
        document.querySelector('.directors__add-button').classList.add('directors__add-button--active');
    }

    onItemClick = (e) => {
        document.querySelector('.directors-data').classList.remove('visually-hidden');
        if (document.querySelector('.directors__item--active')) {
            document.querySelector('.directors__item--active').classList.remove('directors__item--active');
        }
        //console.log(e.target.classList);
        if (e.target.classList == "directors__item") {
            const eventTag = e.target;
            eventTag.classList.add('directors__item--active');
            const number = eventTag.querySelector('.directors__index').innerHTML;
            console.log(number);
            this.setState({ index: number });
            console.log(this.state.index);
            this.setState({ name: directors[number].name});
            this.setState({ born: directors[number].date});
            this.setState({ place: directors[number].birthplace});
            this.setState({ biography: directors[number].biography});
            document.querySelector('.directors__delete-button').classList.remove('visually-hidden');
        } else {
            const eventTag = e.target.parentNode;
            eventTag.classList.add('directors__item--active');
            const number = eventTag.querySelector('.directors__index').innerHTML;
            console.log(number);
            this.setState({ index: number });
            console.log(this.state.index);
            this.setState({ name: directors[number].name});
            this.setState({ born: directors[number].date});
            this.setState({ place: directors[number].birthplace});
            this.setState({ biography: directors[number].biography});
            document.querySelector('.directors__delete-button').classList.remove('visually-hidden');
        }
    }

    onCloseClick = (e) => {
        document.querySelector('.directors-data').classList.add('visually-hidden');
        document.querySelector('.directors__item--active').classList.remove('directors__item--active');
        document.querySelector('.directors__delete-button').classList.add('visually-hidden');
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

//window.onload = function() {
    
//}


const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };