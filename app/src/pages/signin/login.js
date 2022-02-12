import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = props;

    const { message } = props;

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        const { dispatch, history } = props;
        dispatch(login(username, password))
        .then(() => {
            history.push("/profile");
            window.location.reload();
        })
        .catch(() => {
            setLoading(false);
        });
    }

    if (isLoggedIn) {
        return <Navigate to='/profile' />
    }

    return (
        <>
            <div className="col-md-12">
                <div className="card card-container">
                    <h1>Авторизация</h1>
                    {
                        message && (
                            <div className="form-group">
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            </div>
                        )
                    }
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">
                                Логин
                            </label>
                            <input 
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                Пароль
                            </label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {
                                    loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )
                                }
                                <span>Войти</span>
                            </button>
                        </div>
                    </form>
                </div>                 
            </div>
        </>
    )
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(Login);

