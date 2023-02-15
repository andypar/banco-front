import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import { Card, Row, Col, Typography, Descriptions, Statistic } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import Extraction from "../components/Extraction";
import Deposit from "../components/Deposit";

const { Title, Text } = Typography;

function Movements() {
  const { id } = useParams();
  const [productInfo, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const productInfo = await productService.getProductById(id);
      setProducts(productInfo);
      console.log("productInfo: ", productInfo);
    }

    fetchProduct();
  }, [id]);

  return (
    <>
      <Title level={4}>Transacciones</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Saldo"
              value={productInfo.balanceAmount}
              precision={0}
              valueStyle={{
                color: "#450feb",
              }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col>
          <p>
            Nro. Cuenta: &nbsp;
            <Text type="secondary">{productInfo.accountNumber}</Text>
          </p>
          <p>
            CBU: &nbsp;
            <Text type="secondary">{productInfo.cbu}</Text>
          </p>

          <p>
            Alias: &nbsp;
            <Text type="secondary">{productInfo.alias}</Text>
          </p>
        </Col>
      </Row>

<br></br>
      {/* <Descriptions title="Datos Cuenta">
        <Descriptions.Item label="Nro. Cuenta">
          {productInfo.accountNumber}
        </Descriptions.Item>
        <Descriptions.Item label="CBU">{productInfo.cbu}</Descriptions.Item>
        <Descriptions.Item label="Alias">{productInfo.alias}</Descriptions.Item>
      </Descriptions> */}

      <Row gutter={10}>
        <Col span={24}></Col>
        <Card title="Extraer" style={{ width: 300 }}>
          <div>
            <Extraction productId={id} setProducts={setProducts}></Extraction>
          </div>
        </Card>
        <Card title="Depositar" style={{ width: 300 }}>
          <div>
            <Deposit productId={id} setProducts={setProducts}></Deposit>
          </div>
        </Card>
      </Row>
    </>
  );
}

export default Movements;
