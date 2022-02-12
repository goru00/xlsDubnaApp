import React, { Component } from 'react';
import { history } from '../helpers/history';

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
        return null;
    }
}

class AuthVerify extends Component {
    constructor(props) {
        super(props);
        history.listen(() => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                const decodeJWT = parseJwt(user.accessToken);
                if (decodeJWT.exp * 1000 < Date.now()) {
                    props.logout();
                }
            }
        });
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default AuthVerify;