import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { AppLogin } from './App/AppLogin';

// setup fake backend
import { configureFakeBackend } from './_helpers';
import { LoginPage } from './LoginPage/LoginPage';
configureFakeBackend();


class Login extends React.Component {
    
    
    render() {
        return (
            <Provider store={store}>
                <AppLogin />
            </Provider>
        )
    }
}

export default Login