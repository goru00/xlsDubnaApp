import React, { useState, useEffect } from "react";
import { Link, Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import EventBus from "../../common/EventBus";
import { logout } from '../../actions/auth';

function Navbar(props) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const user = props.user;
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(undefined);
        }
        EventBus.on("logout", () => {
            logOut();
        });
    }, [props]);

    function logOut() {
        console.log("LOGOUT")
        props.dispatch(logout());
        setCurrentUser(undefined);
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                <li className="navitem">
                    <Link to={"/"} className="nav-link">
                        Главная
                    </Link>
                </li> 
                {
                    currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="navitem">
                                <Link
                                    to={"/profile"}
                                    className="nav-link"
                                >
                                    Профиль
                                </Link>
                            </li>
                            <li className="navitem">
                                <Link 
                                    to={"/signin"} 
                                    className="nav-link"
                                    onClick={logOut}
                                >
                                    Выйти
                                </Link>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="navitem">
                                <Link to={"/signin"} className="nav-link">
                                    Авторизация
                                </Link>
                            </li>
                            <li className="navitem">
                                <Link to={"/signup"} className="nav-link">
                                    Регистрация
                                </Link>
                            </li>
                        </div>
                    )
                }
                </div>
            </nav>
            <Outlet />
        </>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user
    };
  }
  
  export default connect(mapStateToProps)(Navbar);