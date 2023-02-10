import { useState, useEffect } from "react";
import "dayjs/locale/es";
import User from "../components/User";
import Company from "../components/Company";
import userService from "../services/users";
import { Card, Col, Row } from "antd";

function UserList() {
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
      {users.map((x) => (
        <User
          key={x._id}
          data={x}
          usersList={users}
          setUsersList={setUsers}
        ></User>
      ))}
    </>
  );
}

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      const response = await userService.getAllCompanies();
      setCompanies(response);
    }

    fetchCompanies();
  }, []);

  return (
    <>
      {companies.map((x) => (
        <Company
          key={x._id}
          data={x}
          companyList={companies}
          setCompanyList={setCompanies}
        ></Company>
      ))}
    </>
  );
}

function UsersList() {
  return (
    <>
      <Row gutter={20}>
        <Col span={10}>
          <Card title="Personas Físicas" bordered={false}>
            <UserList></UserList>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Personas Jurídicas" bordered={false}>
            <CompanyList></CompanyList>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UsersList;
