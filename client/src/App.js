import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuBar from "./components/Menubar";
import AuthMain from "./pages/auth";

import Home from "./pages/home";

function App() {
  return (
    <React.Fragment>
      <MenuBar />
      <AuthMain />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
