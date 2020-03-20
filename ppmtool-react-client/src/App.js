import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import Landing from "./components/layout/Landing";
import SignUp from "./components/user/Register";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  // store.dispatch({
  //   type: SET_CURRENT_USER,
  //   payload: decoded_jwtToken
  // });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {
              //Public Route
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={SignUp} />
            {
              //Private Routes
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
