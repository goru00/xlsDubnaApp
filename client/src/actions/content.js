import UserService from '../services/user.service';

export const setPublicContent = (tablename, data) => {
    return UserService.setPublicContent(tablename, data).then(
        (response) => {

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}