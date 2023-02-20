import { useState, useEffect } from "react";
import "dayjs/locale/es";
import User from "../components/User";
import RegisterUser from "../components/RegisterUser";
import userService from "../services/users";
import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

function UserList({ users, setUsers }) {
  return (
    <>
      {users.map((x) => (
        <User key={x._id} data={x} setUsersList={setUsers}></User>
      ))}
    </>
  );
}

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchPersons() {
      const response = await userService.getAllPersons();
      setUsers(response);
    }

    fetchPersons();
  }, []);

  return (
    <>
      <Title level={4}>Personas Físicas</Title>
      <Row gutter={20}>
        <Col span={10}>
          <Card title="Registrar" bordered={false}>
            <RegisterUser setUsers={setUsers}></RegisterUser>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Buscar" bordered={false}>
            <UserList 
            users={users} 
            setUsers={setUsers}
            ></UserList>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Users;
