import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import AuthService from "../../services/AuthService";

export default class SignInPage extends React.Component {
  state = {
    email: "",
    password: "",
  };

  private onChangeInput(
    field: "email" | "password"
  ): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        [field]: event.target.value,
      });
    };
  }

  private async handleSignIn(e: React.MouseEvent) {
    e.preventDefault();

    const res = await AuthService.SignIn(this.state.email, this.state.password);

    localStorage.setItem("access-token", res.accessToken);
    localStorage.setItem("refresh-token", res.refreshToken);
  }

  render() {
    return (
      <Row className="justify-content-center align-items-center h-100">
        <Col sm={8} md={6} lg={4}>
          <Row className="mb-5 text-center text-muted">
            <Col>
              <h1>Sign in</h1>
            </Col>
          </Row>
          <Row>
            <Col className="border p-3 p-sm-5">
              <Form>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={this.onChangeInput("email")}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={this.onChangeInput("password")}
                  />
                </Form.Group>
                <Button
                  className="mt-5 w-100 rounded-pill"
                  variant="primary"
                  type="submit"
                  onClick={(e) => this.handleSignIn(e)}
                >
                  Sign in
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
