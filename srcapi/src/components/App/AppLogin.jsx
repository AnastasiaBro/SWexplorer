import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';


class AppLogin extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        //renderLine () {
            if (document.querySelector('.main-nav__item--active')) {
                document.querySelector('.main-nav__item--active').classList.remove('main-nav__item--active');
                document.querySelector('.main-nav__link--active').classList.remove('main-nav__link--active');
            }
        //}
        //this.renderLine();
        return (
            
            <div className="login-page">
                <div className="login-page__container">
                    <div className="login-page__block">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/logout" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(AppLogin);
export { connectedApp as AppLogin }; 