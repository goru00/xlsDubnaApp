import React, { useState } from "react";
import { connect } from 'react-redux';
import { register } from "../../actions/auth";

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [successfully, setSuccessfully] = useState(false);

    const { message } = props;

    function handleSubmit(e) {
        e.preventDefault();
        setLoaded(true);

        const { dispatch } = props;

        dispatch(register(username, password))
        .then(() => {
            setSuccessfully(true);
        }).catch(() => {
            setSuccessfully(false);
        });
        setLoaded(false);
    }

    return (
        <>
            <div className="col-md-12">
                    <div className="card card-container">
                        <h1>Регистрация</h1>
                        {
                            message && (
                                <div className="form-group">
                                    <div className={
                                        successfully ? (
                                            "alert alert-success"
                                        ) : "alert alert-danger"
                                    }>
                                    {message}
                                </div>
                            </div>
                            )
                        }
                        {
                            !successfully && (
                                <form 
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="username">
                                            Имя пользователя
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
                                        disabled={loaded}
                                    >
                                        {
                                            loaded && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )
                                        }
                                        <span>Войти</span>
                                    </button>
                                    </div>
                                </form>       
                            )
                        }
                </div> 
            </div>
        </>
    )
}

function mapStateToProps(state) {
    const { message } = state.message;
    return { message };
  }
  
export default connect(mapStateToProps)(Register);