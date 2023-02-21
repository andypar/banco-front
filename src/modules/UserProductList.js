import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/products";
import userService from "../services/users";
import { Card, Row, Col, Typography, Button } from "antd";
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

  function Back() {
    const navigate = useNavigate();

    return <Button onClick={() => navigate(-1)}>Volver</Button>;
  }

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
      {userInfo?.personType?.description === "Física" ? (
        <Title level={4}>
          {userInfo?.name?.firstName + ", " + userInfo?.name?.lastName}
        </Title>
      ) : (
        <Title level={4}>{userInfo?.name?.firstName}</Title>
      )}

      <Col>
        <p>
          Email: &nbsp;
          <Text type="secondary">{userInfo.email}</Text>
        </p>
        <p>
          Teléfono: &nbsp;
          <Text type="secondary">{userInfo.telephone}</Text>
        </p>

        <p>
          Cuil/Cuit: &nbsp;
          <Text type="secondary">{userInfo.cuilCuit}</Text>
        </p>
      </Col>

      <Title level={4}>Productos Disponibles</Title>

      {products.length === 0 ? (
        <p>
          <Text type="danger">No hay nuevos productos disponibles</Text>
        </p>
      ) : (
        ""
      )}

      <Row gutter={0}>
        {products.map((product, i) => (
          <Col span={8} key={i} className="gutter-row">
            <Card
              key={i}
              title={product.type + " " + product.currency.toUpperCase()}
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
            <br></br>
          </Col>
        ))}
      </Row>

      <Title level={4}>Productos Actuales</Title>
      {userInfo?.products?.length === 0 ? (
        <p>
          <Text type="danger">El usuario no posee productos</Text>
        </p>
      ) : (
        ""
      )}

      <Row gutter={0}>
        {userInfo?.products?.map((userproducts, i) => (
          <Col span={9} key={i} className="gutter-row2">
            <Card
              key={i}
              title={
                userproducts.type?.description +
                " " +
                userproducts.currency?.description.toUpperCase()
              }
              // style={{
              //   width: 400,
              //   height: 400,
              // }}
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
                <Text type="secondary">${userproducts.balanceAmount}</Text>
              </p>

              <Product
                productId={userproducts._id}
                productType={userproducts.type}
                currencyType={userproducts.currency}
                userId={id}
                setProducts={setProducts}
                setUserInfo={setUserInfo}
              ></Product>
            </Card>
            <br></br>
          </Col>
        ))}
      </Row>
      <p>
        <Back></Back>
      </p>
    </>
  );
}

export default AvailableProducts;
