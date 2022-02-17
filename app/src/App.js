import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// components

import Navbar from "./components/navbar/navbar";

// pages

import Home from "./pages/home/home";
import Login from './pages/signin/login';
import Register from './pages/signup/signup';
import Profile from './pages/profile/profile';

// services

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import EventBus from "./common/EventBus";

function App(props) {
  const [user, setUser] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  history.listen((location) => {
    props.dispath(clearMessage());
  });

  useEffect(() => {
    const user = props.user;
    if (user) {
      setUser({
        currentUser: user,
        rootRole: user.roles.includes("ROLE_MODERATOR") ||
          user.roles.includes("ROLE_ADMIN")
      });
      setLoaded(true);
    }
    EventBus.on("logout", () => {
      logout().bind(this);
    });
  }, [props]);

  return (
    <Router history={history}>
      <>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </>
    </Router>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(App);
