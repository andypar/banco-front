import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import { Button, List, Card, Row, Col, Divider } from "antd";

function AvailableProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productInfo = await productService.getUserAvailableProducts(id);
      setProducts(productInfo);
      console.log("productInfo: ", productInfo);
    }
    fetchProducts();
  }, [id]);

  const cols = [];
  const colCount = products.length;

  products.map((product, i) =>
    cols.push(
      <Col key={i.toString()} span={24 / colCount}>
        <div>
          <Card title={product.type + " " + product.currency}>Nuevo</Card>
        </div>
      </Col>
    )
  );

  return (
    <>
      <Row> {cols}</Row>
    </>
  );
}

export default AvailableProducts;
