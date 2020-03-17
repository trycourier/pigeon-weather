import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import axios from "axios";
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  Input,
  Radio,
  Grid,
  Icon,
  Message,
  Segment
} from "semantic-ui-react";

import WeatherWidget from "../components/WeatherWidget";

const User = ({ userId }) => {
  const insert = userId === "new";
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    tempScale: "F",
    zipCode: "",
    email: "",
    phone_number: ""
  });
  const [status, setStatus] = useState({
    isSuccess: false,
    isError: false,
    isLoading: false
  });

  const fetchUser = async userId => {
    const result = await axios(`/api/users/${userId}`);
    console.log(result.data);
    setUser(result.data);
  };

  useEffect(() => {
    if (!insert) {
      fetchUser(userId);
    }
  }, [userId]);

  const handleChange = (e, { name, value }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ isLoading: true, isSuccess: false, isError: false });
    try {
      let result;
      if (insert) {
        result = await axios.post("/api/users", user);
        fetchUser(result.data.id);
      } else {
        result = await axios.put(`/api/users/${userId}`, user);
        fetchUser(userId);
      }
      setStatus({ isSuccess: true, isError: false, isLoading: false });
      setTimeout(() => {
        setStatus({ ...status, isSuccess: false });
      }, 2000);
    } catch (e) {
      console.log(e);
      setStatus({ ...status, isError: true, isLoading: false });
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Section as={Link} to="/" link>
          Users
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>
          {insert ? "New User" : `${user.firstName} ${user.lastName}`}{" "}
        </Breadcrumb.Section>
      </Breadcrumb>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            {" "}
            <Segment>
              <Form
                onSubmit={handleSubmit}
                success={status.isSuccess}
                error={status.isError}
                loading={status.isLoading}
              >
                <Form.Group width="equal">
                  <Form.Field
                    required
                    control={Input}
                    label="First name"
                    placeholder="First name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label="Last name"
                    placeholder="Last name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group inline>
                  <label>Temperature Scale</label>
                  <Form.Field
                    control={Radio}
                    label="° F"
                    name="tempScale"
                    value="F"
                    checked={user.tempScale === "F"}
                    onChange={handleChange}
                  />
                  <Form.Field
                    control={Radio}
                    label="° C"
                    name="tempScale"
                    value="C"
                    checked={user.tempScale === "C"}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Field
                  required
                  inline
                  control={Input}
                  label="Zip Code"
                  placeholder="Zip Code"
                  name="zipCode"
                  value={user.zipCode}
                  onChange={handleChange}
                />
                <Form.Field
                  inline
                  control={Input}
                  label="Email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                />
                <Form.Field
                  inline
                  control={Input}
                  label="SMS Number"
                  placeholder="SMS Number"
                  name="phone_number"
                  type="tel"
                  value={user.phone_number}
                  onChange={handleChange}
                />
                <Button compact type="submit" primary size="tiny">
                  <Icon name="save" /> Save
                </Button>
                <Message
                  success
                  header="Success"
                  content="User details have been saved."
                />
                <Message
                  error
                  header="An Error Occurred"
                  content="There was a problem saving user details. Please try again later."
                />
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            {user.weather && <WeatherWidget weather={user.weather} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default User;
