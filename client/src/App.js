import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuBar from "./components/Menubar";
import AuthMain from "./pages/auth";
import SearchPage from "./pages/home/search";
import Home from "./pages/home";
import Wishlist from "./pages/wishlist";

import { connect } from "react-redux";

function App(props) {
  let { token } = props;
  return (
    <React.Fragment>
      <MenuBar />
      <AuthMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/wishlist">
          {token ? <Wishlist /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </React.Fragment>
  );
}

let stateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

export default connect(stateToProps)(App);
