import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Order from "./component/Order";
import OrderForm from "./component/OrderForm";
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Order} />
          <Route path="/order" component={Order} />
          <Route path="/create" component={OrderForm} />
        </Switch>
      </div>
    );
  }
}

export default App;
