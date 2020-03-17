import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import axios from "axios";
import { Table, Icon, Button, Checkbox, List } from "semantic-ui-react";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const selectUser = (event, { checked, value }) => {
    let arr = [];
    if (checked) {
      arr = [value, ...selectedIds];
    } else {
      arr = selectedIds.filter(id => {
        return id !== value;
      });
    }
    setSelectedIds(arr);
  };

  const deleteUsers = event => {
    console.log("Delete Users: ", selectedIds);
    const promises = selectedIds.map(id => {
      return axios.delete(`/api/users/${id}`);
    });
    Promise.all(promises).then(() => {
      setSelectedIds([]);
      fetchUsers();
    });
  };

  const sendNotifications = async event => {
    const result = await axios.post("/api/send", {
      userIds: selectedIds
    });
    alert("Users Notified!");
    console.log("Send to: ", selectedIds);
  };

  const fetchUsers = async () => {
    const result = await axios("/api/users");
    setUsers(result.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Table compact definition unstackable>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Zip Code</Table.HeaderCell>
          <Table.HeaderCell>Temperature Scale</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.length > 0 ? (
          users.map(user => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell collapsing>
                  <Checkbox value={user.id} onChange={selectUser} />
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/users/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                </Table.Cell>
                <Table.Cell>{user.zipCode}</Table.Cell>
                <Table.Cell>°{user.tempScale}</Table.Cell>
                <Table.Cell>
                  {false && (
                    <List horizontal>
                      {user.uiData?.channels?.map(channel => {
                        return (
                          <List.Item key={channel.name}>
                            <List.Icon
                              name={channel.icon}
                              title={channel.name}
                            />
                          </List.Item>
                        );
                      })}
                    </List>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })
        ) : (
          <Table.Row>
            <Table.Cell colSpan="5" textAlign="center">
              Add your first user.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="4">
            <Button
              compact
              as={Link}
              floated="right"
              primary
              size="tiny"
              to={`/users/new`}
            >
              <Icon name="user" /> Add User
            </Button>
            {selectedIds.length > 0 && (
              <>
                <Button
                  compact
                  positive
                  size="tiny"
                  onClick={sendNotifications}
                >
                  <Icon name="send" />
                  Send {selectedIds.length > 1 ? `(${selectedIds.length})` : ""}
                </Button>
                <Button compact negative size="tiny" onClick={deleteUsers}>
                  <Icon name="dont" />
                  Delete{" "}
                  {selectedIds.length > 1 ? `(${selectedIds.length})` : ""}
                </Button>
              </>
            )}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default UsersTable;
