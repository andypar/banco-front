import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movementService from "../services/movements";
import productService from "../services/products";
import { Card, Row, Col, Typography, List } from "antd";
import Extraction from "../components/Extraction";
import Deposit from "../components/Deposit";

const { Title, Text } = Typography;

function Movements({}) {
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
      <Title level={4}>Movimientos</Title>
      <Title level={5}>Saldo: {productInfo.balanceAmount}</Title>
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

      <Row gutter={10}>
        <Col span={24}></Col>
        <Card title="Extraer" style={{ width: 300 }}>
          <div>
            <Extraction 
            productId={id} 
            setProducts={setProducts}
            ></Extraction>
          </div>
        </Card>
        <Card title="Depositar" style={{ width: 300 }}>
          <div>
            <Deposit 
            productId={id} 
            setProducts={setProducts}
            ></Deposit>
          </div>
        </Card>
      </Row>
    </>
  );
}

export default Movements;
