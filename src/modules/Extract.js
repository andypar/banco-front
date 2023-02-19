import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movementService from "../services/movements";
import userService from "../services/users";
import productService from "../services/products";
import {
  DatePicker,
  Statistic,
  Typography,
  Row,
  Col,
  Table,
  Button,
  Card,
  Descriptions,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

function Extract() {
  const { id, userid } = useParams();
  const [extractInfo, setExtractInfo] = useState([]);
  const [amountInfo, setAmountInfo] = useState([]);
  const [balanceInfo, setBalanceInfo] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [productInfo, setProducts] = useState([]);

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("month");
  };

  const onChange = async (date, dateString) => {
    const dateFrom = dayjs(dayjs(date, "MM-YYYY").startOf("month")).format(
      "YYYY-MM-DD"
    );
    const dateTo = dayjs(dayjs(date, "MM-YYYY").endOf("month")).format(
      "YYYY-MM-DD"
    );

    try {
      const extractInfo = await movementService.getProductMovementsDates(
        id,
        dateFrom,
        dateTo
      );
      setExtractInfo(extractInfo);
      console.log("extractInfo: ", extractInfo);
    } catch (err) {
      console.log("There was an error retrieving product ", id);
      console.log(err);
    }

    try {
      const amountInfo = await movementService.getProductAmountsDates(
        id,
        dateFrom,
        dateTo
      );
      setAmountInfo(amountInfo);
      console.log("amountInfo: ", amountInfo);
    } catch (err) {
      console.log("There was an error retrieving product amounts", id);
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const userInfo = await userService.getUserById(userid);
      setUserInfo(userInfo);
      console.log("userInfo: ", userInfo);
    }

    fetchUser();
  }, [userid]);

  useEffect(() => {
    async function fetchProduct() {
      const productInfo = await productService.getProductById(id);
      setProducts(productInfo);
      console.log("productInfo: ", productInfo);
    }
    fetchProduct();
  }, [id]);

  function ProductDetail({ productInfo }) {
    if (extractInfo.length > 0) {
      return (
        <>
          <Row span={4} className="gutter-row2">
            <Col span={20}>
              <Card bordered={false}>
                <Descriptions>
                  <Descriptions.Item label="Nro. Cuenta">
                    {productInfo.accountNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="CBU">
                    {productInfo.cbu}
                  </Descriptions.Item>
                  <Descriptions.Item label="Alias">
                    {productInfo.alias}
                  </Descriptions.Item>
                  <Descriptions.Item label="Límite Extracción Diaria">
                    ${productInfo.extractionLimit}
                  </Descriptions.Item>
                  {productInfo?.type?.description === "caja-ahorro" ? (
                    ""
                  ) : (
                    <Descriptions.Item label="Monto Sobregiro"
                    >
                      ${productInfo.overdraftAmount}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <Row span={4} className="gutter-row"></Row>
        </>
      );
    }
  }

  function UserDetail({ userInfo, productInfo }) {
    if (extractInfo.length > 0) {
      return (
        <>
          <Row span={4} className="gutter-row2">
            <Col span={20}>
              <Card bordered={false}>
                <Descriptions>
                  <Descriptions.Item label="Nombre">
                    {userInfo?.name?.firstName} {userInfo?.name?.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="E-mail">
                    {userInfo.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Teléfono">
                    {userInfo.telephone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cuil/Cuit">
                    {userInfo.cuilCuit}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <Row span={4} className="gutter-row"></Row>
        </>
      );
    }
  }

  function ExtractInfo() {
    const [dataTable, setDataTable] = useState([]);
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
      setDataTable(
        extractInfo?.map((movements, i) => ({
          descriptionMovement: movements.descriptionMovement,
          description: movements.type?.description,
          createdAt: dayjs(movements.createdAt).format("DD-MM-YYYY"),
          balance: movements.balance,
          totalBalance: movements.totalBalance,
          _id: movements._id,
        }))
      );
    }, []);

    if (extractInfo.length > 0) {
      return (
        <Row span={4} className="gutter-row2">
          <Col span={20}>
            <Table
              locale={{
                triggerAsc: "Fecha Ascendente",
                triggerDesc: "Fecha Descendente",
                cancelSort: "Cancelar",
              }}
              dataSource={dataTable}
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="_id"
            />
          </Col>
        </Row>
      );
    }
  }

  function BalanceTotal() {
    useEffect(() => {
      setBalanceInfo(extractInfo[0]?.totalBalance);
    }, []);

    if (extractInfo.length > 0) {
      return (
        <Col span={6} key="saldo">
          <Card bordered={false}>
            <Statistic
              title="Saldo"
              value={balanceInfo}
              style={{ width: 300 }}
              prefix={<DollarOutlined />}
            ></Statistic>
          </Card>
        </Col>
      );
    }
  }

  function NoExtractInfo() {
    if (extractInfo.length === 0) {
      return (
        <p>
          <Text type="danger">No hay resumen para el mes seleccionado</Text>
        </p>
      );
    }
  }

  function Back() {
    const navigate = useNavigate();

    return <Button onClick={() => navigate(-1)}>Volver</Button>;
  }

  return (
    <>
      <Title level={4}>Resumen</Title>
      <Title level={5}>Elija el mes del resumen</Title>
      <DatePicker
        picker="month"
        onChange={onChange}
        placeholder="Mes"
        disabledDate={disabledDate}
      />
      <NoExtractInfo></NoExtractInfo>
      <br></br>
      <br></br>

      <UserDetail userInfo={userInfo}></UserDetail>
      <br></br>

      <ProductDetail productInfo={productInfo}></ProductDetail>
      <br></br>

      <Row span={5} className="gutter-row">
        <BalanceTotal></BalanceTotal>
        {amountInfo?.map((movements, i) => (
          <Col span={7} key={i}>
            <Card bordered={false}>
              <Statistic
                title={
                  movements._id === "000000000000000000000000"
                    ? "Total Depositado"
                    : "Total Extraído"
                }
                value={movements.count}
                valueStyle={
                  movements._id === "000000000000000000000000"
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                style={{ width: 300 }}
                prefix={<DollarOutlined />}
              ></Statistic>
            </Card>
          </Col>
        ))}
      </Row>

      <br></br>

      <ExtractInfo></ExtractInfo>

      <p>
        <Back></Back>
      </p>
    </>
  );
}

export default Extract;
