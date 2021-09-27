import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types';

import AuthService from '../services/auth.service';
import AuthHeader from '../services/auth.header';

export const register = (username, email, password) => (dispath) => {
    return AuthService.register(username, email, password)
        .then((response) => {
            dispath({
                type: REGISTER_SUCCESS
            });
            dispath({
                type: SET_MESSAGE,
                payload: response.data.message
            });
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            dispath({
                type: REGISTER_FAIL
            });
            dispath({
                type: SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        });
};

export const login = (username, password) => (dispath) => {
    return AuthService.login(username, password)
        .then((data) => {
            dispath({
                type: LOGIN_SUCCESS,
                payload: { user: data }
            });
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            dispath({
                type: LOGIN_FAIL
            });
            dispath({
                type: SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        }
        );
};