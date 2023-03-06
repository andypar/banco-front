import { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
  ProfileOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Row,
  Alert,
  Popconfirm,
  Col,
} from "antd";
import userService from "../services/users";
import "dayjs/locale/es";
import dayjs from "dayjs";
import AllowedTo from "./AllowedTo";
// const personTypeOptions = ["Física", "Jurídica"];

function Company({ data, setCompanyList }) {
  const { cuilCuit, name, _id } = data;
  const [open, setOpen] = useState(false);
  const [openModify, setOpenCompanyModify] = useState(false);
  const [companyInfo, setUserInfo] = useState({});
  const [msg, setMsg] = useState();

  const loguearInfoCompania = async () => {
    const companyInfo = await userService.getUserById(_id);
    setUserInfo(companyInfo);
    console.log("companyInfo: ", companyInfo);
  };

  const modificarCompania = async (values) => {
    try {
      const response = await userService.updateUserById(_id, {
        name: { firstName: values.firstName, lastName: values.firstName },
        gender: "Indeterminado",
        dni: values.dni,
        dateBirth: dayjs(values.dateBirth.toDate()).format("YYYY-MM-DD"),
        email: values.email,
        password: values.password,
        username: values.username,
        telephone: values.telephone,
        personType: "Jurídica",
        cuilCuit: values.cuilCuit,
      });
      console.log("Response: ", response);
      setOpenCompanyModify(false);
      const companias = await userService.getAllCompanies();
      setCompanyList(companias);
    } catch (err) {
      console.log("There was an error update user ", _id);
      setMsg(err.response.data);
    }
  };

  const eliminarCompania = async () => {
    try {
      const response = await userService.deleteUserById(_id);
      // setCompanyList(companyList.filter((x) => x._id !== _id));
      const companias = await userService.getAllCompanies();
      setCompanyList(companias);
      console.log("Response: ", response);
    } catch (err) {
      console.log("There was an error deleting user ", _id);
      console.log(err);
    }
  };

  function CompanyModal({ open, companyInfo, onCancel }) {
    return (
      <Modal
        open={open}
        okText="Ok"
        onOk={onCancel}
        title="Detalle Persona Jurídica"
        cancelText="Cancelar"
        onCancel={onCancel}
        footer={null}
      >
        <div>
          <p>Razón Social: {companyInfo?.name?.firstName}</p>
          <p>
            Fecha de Creación:{" "}
            {dayjs(companyInfo.dateBirth).format("DD-MM-YYYY")}
          </p>
          <p>Usuario: {companyInfo.username}</p>
          <p>E-mail: {companyInfo.email}</p>
          <p>Teléfono: {companyInfo.telephone}</p>
          <p>Cuit: {companyInfo.cuilCuit}</p>
          <p>Tipo de Persona: {companyInfo?.personType?.description}</p>
        </div>
      </Modal>
    );
  }

  function CompanyModalModify({
    open,
    companyInfo,
    modificarCompania,
    onCancel,
    msg,
  }) {
    const [form] = Form.useForm();

    return (
      <Modal
        open={open}
        title="Modificar Persona Jurídica"
        okText="Modificar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              modificarCompania(values);
            })
            .catch((info) => {
              <Alert
                type="error"
                message="Ha ocurrido un error"
                description={info}
                closable
              ></Alert>;
              console.log("Validate Failed:", info);
            });
        }}
      >
        {msg ? <Alert closable type="error" message={msg} banner /> : null}
        <Form
          form={form}
          layout="vertical"
          name="form-modify"
          initialValues={{
            remember: true,
            dateBirth: dayjs(companyInfo.dateBirth),
            username: companyInfo.username,
            firstName: companyInfo?.name?.firstName,
            lastName: companyInfo?.name?.lastName,
            gender: companyInfo?.gender?.description,
            email: companyInfo.email,
            telephone: companyInfo.telephone,
            cuilCuit: companyInfo.cuilCuit,
            personType: companyInfo?.personType?.description,
          }}
        >
          <Form.Item
            name="firstName"
            label="Nombre/s"
            rules={[
              { type: "string" },
              {
                required: true,
                message: "Por favor ingrese el primer nombre!",
              },
              {
                whitespace: true,
                message: "El primer nombre no debe quedar en blanco",
              },
              {
                min: 3,
                max: 100,
                message: "El primer nombre debe tener al menos 3 caracteres",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateBirth"
            label="Fecha de Creación"
            rules={[
              { type: "date" },
              {
                required: true,
                message: "Por favor ingrese la fecha de nacimiento!",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              format="DD/MM/YYYY"
              disabledDate={(d) => !d || d.isAfter(new Date())}
            />
          </Form.Item>

          <Form.Item
            name="telephone"
            label="Teléfono"
            rules={[
              {
                pattern: /^[0-9]*$/,
                message: "El valor ingresado debe ser numérico!",
              },
              {
                whitespace: true,
                message: "El teléfono no debe quedar en blanco",
              },
              {
                required: true,
                message: "Por favor ingrese el teléfono!",
              },
              {
                min: 8,
                max: 12,
                message: "El teléfono debe tener al menos 8 caracteres",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={
                <PhoneOutlined
                  type="number"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              placeholder="Teléfono"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "El email ingresado tiene un formato inválido!",
              },
              {
                whitespace: true,
                message: "El email no debe quedar en blanco",
              },
              {
                required: true,
                message: "Por favor ingrese el mail!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={
                <MailOutlined
                  type="mail"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              placeholder="Email"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  function CompanyDelete() {
    const text = "Segur@ que quieres borrar la compañía?";
    const confirm = () => eliminarCompania();

    return (
      <>
        <AllowedTo>
          <Popconfirm
            title={text}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ size: "medium" }}
            cancelButtonProps={{ size: "medium" }}
          >
            <Button shape="round" icon={<DeleteOutlined />}>
              Borrar
            </Button>
          </Popconfirm>
        </AllowedTo>
      </>
    );
  }

  function Productos() {
    return (
      <div>
        <Button
          onClick={() => {
            window.location = "/product/available/" + _id;
          }}
          shape="round"
          icon={<CreditCardOutlined />}
        >
          Productos
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p>
        {name?.firstName}, {cuilCuit}
      </p>
      <Row gutter={[10, 10]}>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              loguearInfoCompania();
              setOpen(true);
            }}
            shape="round"
            icon={<ProfileOutlined />}
          >
            Ver Detalle
          </Button>
          <CompanyModal
            open={open}
            companyInfo={companyInfo}
            onCancel={() => {
              setOpen(false);
            }}
          ></CompanyModal>
        </Col>

        <Col>
          <Button
            shape="round"
            icon={<EditOutlined />}
            onClick={() => {
              loguearInfoCompania();
              setMsg("");
              setOpenCompanyModify(true);
            }}
          >
            Editar
          </Button>
          <CompanyModalModify
            msg={msg}
            open={openModify}
            modificarCompania={modificarCompania}
            companyInfo={companyInfo}
            onCancel={() => {
              setOpenCompanyModify(false);
            }}
          ></CompanyModalModify>
        </Col>

        <Col>
          <CompanyDelete></CompanyDelete>
        </Col>

        {/* <Button onClick={() => eliminarCompania()}>Borrar</Button> */}
        <Col>
          <Productos></Productos>
        </Col>
      </Row>
    </div>
  );
}

export default Company;
