import { useState, useEffect } from "react";
import "dayjs/locale/es";
import Company from "../components/Company";
import RegisterCompany from "../components/RegisterCompany";
import userService from "../services/users";
import { Card, Col, Row, Typography, Input } from "antd";

const { Search } = Input;
const { Title } = Typography;

function SearchFeature({ setCompanies }) {
  
  const searchHandler = async (value) => {
    const response = await userService.getAllCompanies();
    console.log(response);
    setCompanies(response.filter((x) => x.dni.includes(value)));

  };

  return (
    <div>
      <Search
        placeholder="Ingrese CUIT"
        onSearch={searchHandler}
        style={{ width: 200 }}
        allowClear
        enterButton
      />
    </div>
  );
}

function CompanyList({ companies, setCompanies }) {
  return (
    <>
     <SearchFeature setCompanies={setCompanies}></SearchFeature>
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
          <Card title="Registrar" bordered={false} hoverable>
            <RegisterCompany setCompanies={setCompanies}></RegisterCompany>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Buscar" bordered={false} hoverable>
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
