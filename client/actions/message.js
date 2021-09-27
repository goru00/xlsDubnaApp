import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const SetMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
});
export const ClearMessage = (message) => ({
    type: CLEAR_MESSAGE, 
    payload: message
});