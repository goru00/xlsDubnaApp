import {
    LOGIN_FAIL,
    SET_MESSAGE,
  } from "./types";

import UserService from '../services/user.service';

export const setPublicContent = (tablename, data) => (dispatch) =>{
    return UserService.setPublicContent(tablename, data).then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            dispatch({
                type: LOGIN_FAIL,
            });
        
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
            return Promise.reject();
        }
    )
}