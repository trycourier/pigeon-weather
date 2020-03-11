import React from "react";
import { Router } from "@reach/router";
import { Container } from "semantic-ui-react";

import Header from "./components/Header";
import UsersTable from "./pages/UsersTable";
import User from "./pages/User";

const App = () => {
  return (
    <Container style={{ marginTop: '1em' }}>
      <Header />
      <Router>
        <UsersTable path="/" />
        <User path="/users/:userId" />
      </Router>
    </Container>
  );
};

export default App;
