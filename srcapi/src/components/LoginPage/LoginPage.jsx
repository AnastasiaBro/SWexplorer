import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        const header = document.querySelector('#header');
        header.querySelector('.home-page__title').classList.add('visually-hidden');
        header.querySelector('.home-page__logout').innerHTML = "Login";
        header.querySelector('.home-page__logout').href = "/logout";

        window.onload = function () {
            if (document.querySelector('.main-nav__item--active')) {
                document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
                document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
            }
        }

        return (
            <div className="login">
                <div className="login__placeholder">
                    <div className="login__row">
                        <p className="login__text">Username:</p>
                        <p className="login__text--yellow">droid</p>
                    </div>
                    <div className="login__row">
                        <p className="login__text">Password:</p>
                        <p className="login__text--yellow">droid</p>
                    </div>
                </div>
                <div className="login__row">
                    <h2>Login</h2>
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'login__form-group' + (submitted && !username ? ' has-error' : '')}>
                        <div className="login__row">
                            <img className="login__user-img" src="./img/user.png" />
                            <label htmlFor="username" className="login__label">
                            <input type="text" placeholder="Username" className="login__input" name="username" value={username} onChange={this.handleChange} />
                            </label>
                        </div>
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'login__form-group' + (submitted && !password ? ' has-error' : '')}>
                        <div className="login__row">
                            <img className="login__padlock-img" src="./img/padlock.png" />
                            <label htmlFor="password" className="login__label">
                            <input type="password" placeholder="Password" className="login__input" name="password" value={password} onChange={this.handleChange} />
                            </label>
                        </div>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="login__form-group">
                        <button className="btn login__button">Login</button>
                        {loggingIn &&
                            <img className="login__img" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}


const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 