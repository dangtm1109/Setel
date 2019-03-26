/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import config from "../config/Config";
import axios from "axios";
export default class OrderForm extends React.Component {
  constructor() {
    super();
    this.state = {
      alert: false
    };
  }
  _createOrder() {
    if (this._inputName.value === "" || this._inputPrice.value === "") {
      this.setState({ alert: true });
      return;
    }
    axios
      .post(`${config.URL}/orders`, {
        name: this._inputName.value,
        price: this._inputPrice.value,
        description: this._inputDescription.value
      })
      .then(_result => {
        this.props.history.push("/");
      });
  }
  render() {
    const { alert } = this.state;
    return (
      <Container>
        {alert && (
          <Alert color="danger">
            Field "Name" and Field "Price" are required
          </Alert>
        )}
        <Form>
          <FormGroup>
            <Label for="">Name</Label>
            <Input
              type="text"
              innerRef={refInut => (this._inputName = refInut)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">Price</Label>
            <Input
              type="number"
              innerRef={refInut => (this._inputPrice = refInut)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">Description</Label>
            <Input
              type="textarea"
              name="text"
              innerRef={refInut => (this._inputDescription = refInut)}
            />
          </FormGroup>
          <Row>
            <Col md={1}>
              <Button color="primary" onClick={this._createOrder.bind(this)}>
                Create
              </Button>
            </Col>
            <Col md={1}>
              <Link to="/">
                <Button>Cancel</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
