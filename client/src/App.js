import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuBar from "./components/Menubar";
import AuthMain from "./pages/auth";
import SearchPage from "./pages/home/search";
import Home from "./pages/home";

function App() {
  return (
    <React.Fragment>
      <MenuBar />
      <AuthMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
