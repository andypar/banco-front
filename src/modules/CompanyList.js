import { useState, useEffect } from "react";
import "dayjs/locale/es";
import Company from "../components/Company";
import RegisterCompany from "../components/RegisterCompany";
import userService from "../services/users";
import { Card, Col, Row, Typography, Input, Pagination } from "antd";
import AllowedTo from "../components/AllowedTo";


const { Search } = Input;
const { Title } = Typography;

function SearchFeature({ setCompanies }) {
  
  const searchHandler = async (value) => {
    const response = await userService.getAllCompanies();
    console.log(response);
    setCompanies(response.filter((x) => x.cuilCuit.includes(value)));

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

  const [currentPageElements, setCurrentPageElements] = useState([]);
  const [current, setCurrent] = useState(1);
  const offset= 0
  const elementsPerPage = 3 
  const totalElementsCount = companies.length

  const onChange = (page) => {
    setCurrent(page);
    const o = (page-1) * elementsPerPage;
    setCurrentPageElements(companies.slice(o, o + elementsPerPage))
  };

  useEffect(() => {
    setCurrentPageElements(companies.slice(offset, offset + elementsPerPage));
  }, [companies]);

  return (
    <>
     <SearchFeature setCompanies={setCompanies}></SearchFeature>
      {currentPageElements.map((x) => (
        <Company key={x._id} data={x} setCompanyList={setCompanies}></Company>
      ))}
            <br></br>
      <Pagination
        current={current}
        onChange={onChange}
        defaultPageSize={3}
        total={totalElementsCount}
      ></Pagination>
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
        <AllowedTo>
        <Col span={10}>
          <Card title="Registrar" bordered={false} hoverable>
            <RegisterCompany setCompanies={setCompanies}></RegisterCompany>
          </Card>
        </Col>
        </AllowedTo>
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
