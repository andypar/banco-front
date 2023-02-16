import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "dayjs/locale/es";
import dayjs from "dayjs";
import productService from "../services/products";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Statistic,
  Button,
  Table,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import Extraction from "../components/Extraction";
import Deposit from "../components/Deposit";

const { Title, Text } = Typography;

function Movements() {
  const { id } = useParams();
  const [productInfo, setProducts] = useState([]);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Tipo Movimiento",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Descripción",
      dataIndex: "descriptionMovement",
      key: "descriptionMovement",
    },
    {
      title: "Fecha Movimiento",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => {
        return (
          dayjs(a.createdAt, "DD-MM-YYYY").unix() -
          dayjs(b.createdAt, "DD-MM-YYYY").unix()
        );
      },
    },
    {
      title: "Importe",
      dataIndex: "balance",
      key: "balance",
      render(text, record) {
        return {
          props: {
            style: {
              color: record.description === "extracción" ? "red" : "green",
            },
          },
          children: <div>${text}</div>,
        };
      },
    },
    {
      title: "Saldo",
      dataIndex: "totalBalance",
      key: "totalBalance",
      render(text, record) {
        return {
          children: <div>${text}</div>,
        };
      },
    },
  ];

  useEffect(() => {
    async function fetchProduct() {
      const productInfo = await productService.getProductById(id);
      setProducts(productInfo);
      console.log("productInfo: ", productInfo);

      setData(
        productInfo?.movements?.map((movements, i) => ({
          descriptionMovement: movements.descriptionMovement,
          description: movements.type?.description,
          createdAt: dayjs(movements.createdAt).format("DD-MM-YYYY"),
          balance: movements.balance,
          totalBalance: movements.totalBalance,
          _id: movements._id,
        }))
      );
    }
    fetchProduct();
  }, [id]);

  function Back() {
    const navigate = useNavigate();

    return (
      <>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </>
    );
  }

  return (
    <>
      <Title level={4}>Cuenta</Title>
      <Row gutter={16}>
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
      </Row>

      <br></br>
      {/* <Descriptions title="Datos Cuenta">
        <Descriptions.Item label="Nro. Cuenta">
          {productInfo.accountNumber}
        </Descriptions.Item>
        <Descriptions.Item label="CBU">{productInfo.cbu}</Descriptions.Item>
        <Descriptions.Item label="Alias">{productInfo.alias}</Descriptions.Item>
      </Descriptions> */}

         <Title level={4}>Transacciones</Title>
          <Space wrap>
            <Extraction productId={id} setProducts={setProducts}></Extraction>
            <Deposit productId={id} setProducts={setProducts}></Deposit>
          </Space>
        <br></br>
        <br></br>

      <Title level={4}>Detalle Movimientos</Title>
      <Row>
        <Col />
        <Col>
          <Table
          locale={{triggerAsc:"Fecha Ascendente", triggerDesc:"Fecha Descendente", cancelSort:"Cancelar"}}
            dataSource={data}
            columns={columns}
            rowKey="_id"
            setProducts={setProducts}
            //  rowClassName={(record) => (record.description === "extracción" ? "red" : "green")}
          />
        </Col>
        <Col />
      </Row>

      <p>
        <Back></Back>
      </p>
    </>
  );
}

export default Movements;
