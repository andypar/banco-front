import { useState } from "react";
import { MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, DatePicker, Space, Alert } from "antd";
import userService from "../services/users";
import "dayjs/locale/es";
import dayjs from "dayjs";
// const personTypeOptions = ["Física", "Jurídica"];

function Company({ data, companyList, setCompanyList }) {
  const { dni, name, username, _id } = data;
  const [open, setOpen] = useState(false);
  const [openModify, setOpenCompanyModify] = useState(false);
  const [companyInfo, setUserInfo] = useState({});

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
      console.log(err);
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
        title="Detalle del usuario"
        cancelText="Cancelar"
        onCancel={onCancel}
        footer={null}
      >
        <div>
          <p>
            Razón Social: {companyInfo?.name?.firstName}
          </p>
          <p>
            Fecha de Creación: {dayjs(companyInfo.dateBirth).format("DD-MM-YYYY")}
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

  function CompanyModalModify({ open, companyInfo, modificarCompania, onCancel }) {
    const [form] = Form.useForm();

    return (
      <Modal
        open={open}
        title="Modificar Usuario"
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
            label="Fecha de Nacimiento"
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

          <Form.Item
            name="username"
            label="Usuario"
            rules={[
              { type: "string" },
              {
                required: true,
                message: "Please input the username!",
              },
              {
                min: 5,
                max: 50,
                message: "El usuario debe tener al menos 5 caracteres",
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  type="username"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              placeholder="Usuario"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  return (
    <div>
      <p>
        {name?.firstName}, {dni}, {username}
      </p>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            loguearInfoCompania();
            setOpen(true);
          }}
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

        <Button
          onClick={() => {
            loguearInfoCompania();
            setOpenCompanyModify(true);
          }}
        >
          Modificar
        </Button>
        <CompanyModalModify
          open={openModify}
          modificarCompania={modificarCompania}
          companyInfo={companyInfo}
          onCancel={() => {
            setOpenCompanyModify(false);
          }}
        ></CompanyModalModify>

        <Button onClick={() => eliminarCompania()}>Borrar</Button>
      </Space>
    </div>
  );
}

export default Company;
