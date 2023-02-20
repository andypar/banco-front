import { useState, useEffect } from "react";
import "dayjs/locale/es";
import Company from "../components/Company";
import RegisterCompany from "../components/RegisterCompany";
import userService from "../services/users";
import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

function CompanyList({ companies, setCompanies }) {
  return (
    <>
      {companies.map((x) => (
        <Company key={x._id} data={x} setCompanyList={setCompanies}></Company>
      ))}
    </>
  );
}

function Companies() {
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
      <Title level={4}>Personas Jurídicas</Title>
      <Row gutter={20}>
        <Col span={10}>
          <Card title="Registrar" bordered={false}>
            <RegisterCompany setCompanies={setCompanies}></RegisterCompany>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Buscar" bordered={false}>
            <CompanyList
              companies={companies}
              setCompanies={setCompanies}
            ></CompanyList>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Companies;
