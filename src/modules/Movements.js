import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useParams, useNavigate } from "react-router-dom";
import "dayjs/locale/es";
import dayjs from "dayjs";
import productService from "../services/products";
import movementService from "../services/movements";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Statistic,
  Button,
  Table,
  Popconfirm,
  Tooltip,
} from "antd";
import { DollarOutlined, DeleteOutlined } from "@ant-design/icons";
import Extraction from "../components/Extraction";
import Deposit from "../components/Deposit";

const { Title, Text } = Typography;

function Movements() {
  const { id } = useParams();
  const [productInfo, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [productAmount, setProductAmount] = useState([]);
  const formatter = (value) => <CountUp end={value} separator="," />;

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
    {
      title: "Eliminar",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <MovementDelete productId={id} movementId={record._id}></MovementDelete>
      ),
    },
  ];

  useEffect(() => {
    async function fetchProduct() {
      const productInfo = await productService.getProductById(id);
      setProducts(productInfo);
      console.log("productInfo: ", productInfo);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
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
  }, [productInfo]);

  useEffect(() => {
    async function fetchTodayAmounts() {
      const productAmount = await movementService.getProductAmountsToday(id);
      setProductAmount(productAmount);
      console.log("productAmount: ", productAmount);
    }
    fetchTodayAmounts();
  }, [id]);

  function TodayAmounts() {
    return (
      <>
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Depositado Hoy"
                value={productAmount[0]?.count}
                precision={0}
                formatter={formatter}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Extraído Hoy"
                value={productAmount[1]?.count}
                precision={0}
                formatter={formatter}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  function MovementDelete({ movementId, productId }) {
    const text = "Segur@ que quieres borrar el producto?";
    const confirm = () => eliminarMovimiento();

    const eliminarMovimiento = async () => {
      try {
        const response = await movementService.deleteMovementById(movementId);
        console.log("Response: ", response);

        const productInfo = await productService.getProductById(productId);
        setProducts(productInfo);

        const productAmount = await movementService.getProductAmountsToday(productId);
        setProductAmount(productAmount);
        
      } catch (err) {
        console.log("There was an error deleting product ", movementId);
        console.log(err);
      }
    };

    return (
      <>
        <Popconfirm
          title={text}
          onConfirm={confirm}
          okText="Si"
          cancelText="No"
          okButtonProps={{ size: "medium", ghost: true }}
          cancelButtonProps={{ size: "medium" }}
        >
          <Tooltip title="Borrar" color={"purple"} key={"purple1"}>
            <Button
              shape="round"
              icon={<DeleteOutlined />}
              type="primary"
              style={{ background: "#7303fc" }}
            ></Button>
          </Tooltip>
        </Popconfirm>
      </>
    );
  }

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
      <Title level={4}>
        {productInfo.type?.description +
          " (" +
          productInfo.currency?.description.toUpperCase() +
          ") "}
      </Title>

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

      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Saldo"
              value={productInfo.balanceAmount}
              precision={0}
              formatter={formatter}
              valueStyle={{
                color: "#450feb",
              }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        {productInfo.type?.description === "cuenta-corriente" ? (
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Monto Sobregiro"
                value={productInfo.overdraftAmount}
                precision={0}
                formatter={formatter}
                valueStyle={{
                  color: "#450feb",
                }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        ) : (
          ""
        )}
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Límite Extraccción diario"
              value={productInfo.extractionLimit}
              precision={0}
              formatter={formatter}
              valueStyle={{
                color: "#450feb",
              }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <br></br>
      <TodayAmounts></TodayAmounts>

      <br></br>

      <Title level={4}>Transacciones</Title>
      <Space wrap>
        <Extraction
          productId={id}
          setProducts={setProducts}
          setProductAmount={setProductAmount}
        ></Extraction>
        <Deposit
          productId={id}
          setProducts={setProducts}
          setProductAmount={setProductAmount}
        ></Deposit>
      </Space>
      <br></br>
      <br></br>

      <Title level={4}>Detalle Movimientos</Title>
      <Row gutter={4}>
        <Col />
        <Col span={20}>
          <Table
            setProducts={setProducts}
            locale={{
              triggerAsc: "Fecha Ascendente",
              triggerDesc: "Fecha Descendente",
              cancelSort: "Cancelar",
            }}
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowKey="_id"
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
