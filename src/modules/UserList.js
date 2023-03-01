import { useState, useEffect } from "react";
import "dayjs/locale/es";
import User from "../components/User";
import RegisterUser from "../components/RegisterUser";
import userService from "../services/users";
import { Card, Col, Row, Typography, Input } from "antd";
import AllowedTo from "../components/AllowedTo";

const { Search } = Input;
const { Title } = Typography;

function SearchFeature({ setUsers }) {
  const searchHandler = async (value) => {
    const response = await userService.getAllPersons();
    console.log(response);
    setUsers(response.filter((x) => x.dni.includes(value)));
  };

  return (
    <div>
      <Search
        placeholder="Ingrese DNI"
        onSearch={searchHandler}
        style={{ width: 200 }}
        allowClear
        enterButton
      />
    </div>
  );
}

function UserList({ users, setUsers }) {
  // const [current, setCurrent] = useState(3);
  // const onChange = (page) => {
  //   console.log(page);
  //   setCurrent(page);
  // };

  return (
    <>
      <SearchFeature setUsers={setUsers}></SearchFeature>
      <br></br>

      {users.map((x) => (
        <User key={x._id} data={x} setUsersList={setUsers}></User>
      ))}
      {/* <br></br>
      <Pagination
        current={current}
        onChange={onChange}
        defaultPageSize={2}
        total={users.length}
      ></Pagination> */}
    </>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  // const [current, setCurrent] = useState(3);
  // const onChange = (page) => {
  //   console.log(page);
  //   setCurrent(page);
  // };

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
        <AllowedTo>
          <Col span={10}>
            <Card title="Registrar" bordered={false} hoverable>
              <RegisterUser setUsers={setUsers}></RegisterUser>
            </Card>
          </Col>
        </AllowedTo>
        <Col span={10}>
          <Card title="Buscar" bordered={false} hoverable>
            {/* <Pagination current={current} onChange={onChange}> */}
            <UserList users={users} setUsers={setUsers}></UserList>
            {/* </Pagination> */}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Users;
