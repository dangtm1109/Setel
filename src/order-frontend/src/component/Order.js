/* eslint-disable no-console */
import React from "react";
import { Table, Button, Container, Alert, Row, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import config from "../config/Config";
import axios from "axios";
class App extends React.Component {
  constructor() {
    super();
    this.timer = 0;
    this.state = {
      orders: []
    };
  }
  componentDidMount() {
    this._loadOrders();
    this.timer = setInterval(() => {
      this._loadOrders();
    }, 1000);
  }
  _loadOrders() {
    axios.get(`${config.URL}/orders`).then(result => {
      const orders = result.data;
      if (JSON.stringify(orders) !== JSON.stringify(this.state.orders)) {
        this.setState({ orders });
      }
    });
  }
  _cancelOrder(order) {
    const obj = {
      ...order,
      status: 3,
      skip: true
    };
    axios
      .put(`${config.URL}/orders`, obj)
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { orders } = this.state;
    return (
      <Container>
        <Row>
          <Link to="/create">
            <Button color="primary">Create</Button>
          </Link>
        </Row>
        {orders.length === 0 && <Alert color="primary">No orders found.</Alert>}
        {orders.length > 0 && (
          <Row>
            <Table dark>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td>
                        <Badge
                          color={
                            item.status === 0
                              ? "primary"
                              : item.status === 1
                              ? "info"
                              : item.status === 2
                              ? "success"
                              : "danger"
                          }
                        >
                          {item.status === 0
                            ? "Created"
                            : item.status === 1
                            ? "Confirmed"
                            : item.status === 2
                            ? "Delivered"
                            : "Cancelled"}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          onClick={this._cancelOrder.bind(this, item)}
                          size="sm"
                          color="info"
                          disabled={
                            item.status === 2 || item.status === 3
                              ? true
                              : false
                          }
                        >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        )}
      </Container>
    );
  }
}
export default App;
