import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movementService from "../services/movements";
import { DatePicker, Statistic, Typography, Col, Table } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

function Extract() {
  const { id } = useParams();
  const [dataTable, setDataTable] = useState([]);
  const [extractInfo, setExtractInfo] = useState([]);
  const [amountInfo, setAmountInfo] = useState([]);

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

  const onChange = async (date, dateString) => {
    console.log(date, dateString);

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
  }, [extractInfo]);

  return (
    <>
      <Title level={4}>Resumen</Title>
      <Title level={5}>Elija el mes del resumen</Title>
      <DatePicker picker="month" onChange={onChange} placeholder="Mes" />

      {amountInfo?.map((movements, i) => (
        <Col span={8} className="gutter-row">
          <Statistic key={movements._id} value={movements.count} style={{ width: 300 }}></Statistic>
        </Col>
      ))}

      <Table
        locale={{
          triggerAsc: "Fecha Ascendente",
          triggerDesc: "Fecha Descendente",
          cancelSort: "Cancelar",
        }}
        dataSource={dataTable}
        columns={columns}
        pagination={{ pageSize: 25 }}
        rowKey="_id"
      />
    </>
  );
}

export default Extract;
