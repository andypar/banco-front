import { useState, useEffect } from "react";
import "dayjs/locale/es";
import User from "../components/User";
import RegisterUser from "../components/RegisterUser";
import userService from "../services/users";
import { Card, Col, Row, Typography, Input, Pagination } from "antd";
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

  const [currentPageElements, setCurrentPageElements] = useState([]);
  const offset= 0
  const elementsPerPage = 2 
  const totalElementsCount = users.length
  // const pagesCount = Math.ceil(totalElementsCount / elementsPerPage)
  // const currentPageElements = allElements.slice(offset, offset + elementsPerPage);

  console.log(currentPageElements)

  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
    const o = (page-1) * elementsPerPage;
    setCurrentPageElements(users.slice(o, o + elementsPerPage))
  };

  useEffect(() => {
    setCurrentPageElements(users.slice(offset, offset + elementsPerPage));
  }, [users]);
  
  return (
    <>
      <SearchFeature setUsers={setUsers}></SearchFeature>
      <br></br>
      {currentPageElements?.map((x) => (
        <User key={x._id} data={x} setUsersList={setUsers}></User>
      ))}
      <br></br>
      <Pagination
        current={current}
        onChange={onChange}
        defaultPageSize={2}
        total={totalElementsCount}
      ></Pagination>
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
