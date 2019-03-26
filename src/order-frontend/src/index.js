import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { createHashHistory } from "history";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
const hist = createHashHistory();
ReactDOM.render(
  <Router history={hist}>
    <div>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
