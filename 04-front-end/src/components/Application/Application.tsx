import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import './Application.sass';
import HomePage from '../HomePage/HomePage';

export default function Application() {
  return (
    <Container className="Application">
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Container>
  );
}