import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import Search from "./components/search/Search";
import routes from "./routes";
import "./sass/App.scss";

export default class App extends React.Component {
  render() {
    const routeComponents = routes.map(({ path, component }, key) => (
      <Route exact path={path} component={component} key={key} />
    ));
    return (
      <div>
        <Search />
        <div role="main" className="container app-container">
          <Switch>
            {routeComponents}
            <Redirect from="*" to="/"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}
