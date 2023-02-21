import { useState, useEffect } from "react";
import userService from "../services/users";
import { Col, Row, Statistic, Card, Typography } from "antd";
import {
  ShopOutlined,
  UserOutlined,
  CreditCardOutlined,
  NumberOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

function Home() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchPersons() {
      const users = await userService.getAllPersons();
      setUsers(users);
    }

    fetchPersons();
  }, []);

  useEffect(() => {
    async function fetchCompanies() {
      const response = await userService.getAllCompanies();
      setCompanies(response);
    }

    fetchCompanies();
  }, []);

  return (
    <>
      <Title level={4}>Home</Title>
      <Row gutter={16}>
        <Col span={5}>
          <Card title="Personas Físicas" bordered={false}>
            <Col span={12}>
              <Statistic
                value={users.length}
                prefix={<UserOutlined />}
                valueStyle={{
                  color: "#250be6",
                }}
              />
            </Col>
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Productos" bordered={false}>
            <Col span={12}>
              <Statistic
                value={users.reduce((acc, c) => acc + c.products?.length, 0)}
                prefix={<CreditCardOutlined />}
                valueStyle={{
                  color: "#250be6",
                }}
              />
            </Col>
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Movimientos" bordered={false}>
            <Statistic
              value={users.reduce(
                (acc, c) =>
                  acc +
                  c.products.reduce((acc, c) => acc + c.movements.length, 0),
                0
              )}
              prefix={<NumberOutlined />}
              valueStyle={{
                color: "#250be6",
              }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Saldo Total" bordered={false}>
            <Statistic
              value={users.reduce(
                (acc, c) =>
                  acc +
                  c.products?.reduce((acc, c) => acc + c.balanceAmount, 0),
                0
              )}
              prefix={<DollarOutlined />}
              valueStyle={{
                color: "#250be6",
              }}
            />
          </Card>
        </Col>
      </Row>

      <br></br>

      <Row gutter={16}>
        <Col span={5}>
          <Card title="Personas Jurídicas" bordered={false}>
            <Col span={12}>
              <Statistic
                value={companies.length}
                prefix={<ShopOutlined />}
                valueStyle={{
                  color: "#960be6",
                }}
              />
            </Col>
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Productos" bordered={false}>
            <Col span={12}>
              <Statistic
                value={companies.reduce(
                  (acc, c) => acc + c.products?.length,
                  0
                )}
                prefix={<CreditCardOutlined />}
                valueStyle={{
                    color: "#960be6",
                  }}
              />
            </Col>
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Movimientos" bordered={false}>
            <Col span={12}>
              <Statistic
                value={companies.reduce(
                  (acc, c) =>
                    acc +
                    c.products.reduce((acc, c) => acc + c.movements.length, 0),
                  0
                )}
                prefix={<NumberOutlined />}
                valueStyle={{
                    color: "#960be6",
                  }}
              />
            </Col>
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Saldo Total" bordered={false}>
            <Statistic
              value={companies.reduce(
                (acc, c) =>
                  acc +
                  c.products?.reduce((acc, c) => acc + c.balanceAmount, 0),
                0
              )}
              prefix={<DollarOutlined />}
              valueStyle={{
                color: "#960be6",
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
