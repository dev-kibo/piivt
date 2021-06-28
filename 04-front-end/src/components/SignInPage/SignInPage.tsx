import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import AuthService from "../../services/AuthService";
import EventRegister from "../../api/EventRegister";
import { withRouter } from "react-router";
import { History } from "history";
import CustomAlert from "../Alert/CustomAlert";
import { AuthContext } from "../../contexts/AuthContext";
interface ISignInPageProps {
  history: History;
}

function SignInPage({ history }: ISignInPageProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );
  const [isSignInButtonDisabled, setIsSignInButtonDisabled] =
    useState<boolean>(true);

  const user = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      history.push("/");
    }
  }, [user, history]);

  useEffect(() => {
    if (email.length > 0 && password.length > 7) {
      setIsSignInButtonDisabled(false);
    } else {
      setIsSignInButtonDisabled(true);
    }
  }, [email.length, password.length]);

  async function handleSignIn(e: React.MouseEvent) {
    e.preventDefault();

    try {
      const res = await AuthService.SignIn(email, password);

      localStorage.setItem("access-token", res.accessToken);
      localStorage.setItem("refresh-token", res.refreshToken);

      EventRegister.emit("AUTH_EVENT", "user_login");

      history.push("/dashboard");
    } catch (error: any) {
      setMessage("Invalid email or password.");
      setAlertVariant("danger");
      setIsAlertShown(true);
    }
  }

  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col sm={8} md={6} lg={4}>
        <Row className="mb-5 text-center text-muted">
          <Col>
            <h1>Sign in</h1>
          </Col>
        </Row>
        <Row>
          <CustomAlert
            message={message}
            variant={alertVariant}
            setIsAlertShown={setIsAlertShown}
            isDismissible={true}
            isVisible={message?.length > 0}
          />
          <Col className="border p-3 p-sm-5">
            <Form>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className="mt-5 w-100 rounded-pill"
                variant="primary"
                type="submit"
                onClick={(e) => handleSignIn(e)}
                disabled={isSignInButtonDisabled}
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

export default withRouter<any, any>(SignInPage);
