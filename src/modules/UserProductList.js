import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import userService from "../services/users";
import { Card, Row, Col, Typography, List } from "antd";
import ProductCC from "../components/ProductCC";
import ProductCA from "../components/ProductCA";
import Product from "../components/Product";

const { Title, Text } = Typography;

function AvailableProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchAvailableProducts() {
      const productInfo = await productService.getUserAvailableProducts(id);
      setProducts(productInfo);
      console.log("productInfo: ", productInfo);
    }

    fetchAvailableProducts();

    async function fetchUserProducts() {
      const userInfo = await userService.getUserById(id);
      setUserInfo(userInfo);
      console.log("userInfo: ", userInfo);
    }

    fetchUserProducts();
  }, [id]);

  // const cols = [];
  // const colCount = products.length;

  // products.map((product, i) =>
  //   cols.push(
  //     <Col key={i.toString()} span={24 / colCount}>
  //       <div>
  //         <Card title={product.type + " " + product.currency}>
  //           Nuevo
  //           </Card>
  //       </div>
  //     </Col>
  //   )
  // );

  return (
    <>
      <Title level={4}>Productos Disponibles</Title>
      <Row gutter={10}>
        <Col span={24}></Col>
        {products.map((product, i) => (
          <Card
            key={i}
            title={product.type + " " + product.currency}
            style={{ width: 300 }}
          >
            <div>
              {product.type === "caja-ahorro" ? (
                <ProductCA
                  productType={product.type}
                  currencyType={product.currency}
                  userId={id}
                  setProducts={setProducts}
                  setUserInfo={setUserInfo}
                ></ProductCA>
              ) : (
                <ProductCC
                  productType={product.type}
                  currencyType={product.currency}
                  userId={id}
                  setProducts={setProducts}
                  setUserInfo={setUserInfo}
                ></ProductCC>
              )}
            </div>
          </Card>
        ))}
      </Row>

      <Title level={4}>Productos Actuales</Title>

      <Row gutter={10}>
        <Col span={24}></Col>
        {userInfo?.products?.map((userproducts, i) => (
          <Card
            key={i}
            title={
              userproducts.type?.description +
              " " +
              userproducts.currency?.description
            }
            style={{
              width: 300,
              height: 300,
            }}
          >
            <p>
              Nro. Cuenta: &nbsp;
              <Text type="secondary">{userproducts.accountNumber}</Text>
            </p>

            <p>
              CBU: &nbsp;
              <Text type="secondary">{userproducts.cbu}</Text>
            </p>

            <p>
              Alias: &nbsp;
              <Text type="secondary">{userproducts.alias}</Text>
            </p>

            <p>
              Saldo: &nbsp;
              <Text type="secondary">{userproducts.balanceAmount}</Text>
            </p>

            <List>
              <List.Item>
                <Product
                  productId={userproducts._id}
                  productType={userproducts.type}
                  currencyType={userproducts.currency}
                  userId={id}
                  setProducts={setProducts}
                  setUserInfo={setUserInfo}
                ></Product>
              </List.Item>
            </List>
          </Card>
        ))}
      </Row>
    </>
  );
}

export default AvailableProducts;