import { useState } from "react";
import { MailOutlined, UserOutlined, PhoneOutlined,  EditOutlined, DeleteOutlined, ProfileOutlined, CreditCardOutlined} from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Radio,
  Alert,
  Popconfirm,
  Tooltip,
} from "antd";
import userService from "../services/users";
import "dayjs/locale/es";
import dayjs from "dayjs";
const genderOptions = ["Femenino", "Masculino", "Indeterminado"];
// const personTypeOptions = ["Física", "Jurídica"];

function User({ data, usersList, setUsersList }) {
  const { dni, name, username, _id } = data;
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const loguearInfoCompleta = async () => {
    const userInfo = await userService.getUserById(_id);
    setUserInfo(userInfo);
    console.log("userInfo: ", userInfo);
  };

  const modificarUsuario = async (values) => {
    try {
      const response = await userService.updateUserById(_id, {
        name: { firstName: values.firstName, lastName: values.lastName },
        gender: values.gender,
        dni: values.dni,
        dateBirth: dayjs(values.dateBirth.toDate()).format("YYYY-MM-DD"),
        email: values.email,
        password: values.password,
        username: values.username,
        telephone: values.telephone,
        personType: "Física",
        cuilCuit: values.cuilCuit,
      });
      console.log("Response: ", response);
      setOpenModify(false);
      const usuarios = await userService.getAllPersons();
      setUsersList(usuarios);
    } catch (err) {
      console.log("There was an error update user ", _id);
      console.log(err);
    }
  };

  const eliminarUsuario = async () => {
    try {
      const response = await userService.deleteUserById(_id);
      // setUsersList(usersList.filter((x) => x._id !== _id));
      const usuarios = await userService.getAllPersons();
      setUsersList(usuarios);
      console.log("Response: ", response);
    } catch (err) {
      console.log("There was an error deleting user ", _id);
      console.log(err);
    }
  };

  function UserModal({ open, userInfo, onCancel }) {
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
            Nombre: {userInfo?.name?.firstName} {userInfo?.name?.lastName}
          </p>
          <p>DNI: {userInfo.dni}</p>
          <p>
            Fecha de Nacimiento:{" "}
            {dayjs(userInfo.dateBirth).format("DD-MM-YYYY")}
          </p>
          <p>Género: {userInfo?.gender?.description}</p>
          <p>Usuario: {userInfo.username}</p>
          <p>E-mail: {userInfo.email}</p>
          <p>Teléfono: {userInfo.telephone}</p>
          <p>Cuil/Cuit: {userInfo.cuilCuit}</p>
          <p>Tipo de Persona: {userInfo?.personType?.description}</p>
        </div>
      </Modal>
    );
  }

  function UserModalModify({ open, userInfo, modificarUsuario, onCancel }) {
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
              modificarUsuario(values);
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
            dateBirth: dayjs(userInfo.dateBirth),
            username: userInfo.username,
            firstName: userInfo?.name?.firstName,
            lastName: userInfo?.name?.lastName,
            gender: userInfo?.gender?.description,
            email: userInfo.email,
            telephone: userInfo.telephone,
            cuilCuit: userInfo.cuilCuit,
            personType: userInfo?.personType?.description,
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
            name="lastName"
            label="Apellido/s"
            rules={[
              { type: "string" },
              {
                required: true,
                message: "Por favor ingrese el apellido!",
              },
              {
                whitespace: true,
                message: "El apellido no debe quedar en blanco",
              },
              {
                min: 3,
                max: 100,
                message: "El apellido debe tener al menos 3 caracteres",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Género"
            rules={[
              { type: "string" },
              {
                required: true,
                message: "Por favor ingrese el género!",
              },
            ]}
          >
            <Radio.Group options={genderOptions} />
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

          {/* <Form.Item
            name="personType"
            label="Tipo Persona"
            rules={[
              { type: "string" },
              {
                required: true,
                message: "Por favor ingrese el tipo de persona!",
              },
            ]}
          >
            <Radio.Group options={personTypeOptions} />
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }

  function UserDelete() {
    const text = "Segur@ que quieres borrar el usuario?";
    const confirm = () => eliminarUsuario();

    return (
      <>
        <Popconfirm
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ size: "medium" }}
          cancelButtonProps={{ size: "medium" }}
        >
          <Tooltip title="Borrar" color={"blue"} key={"blue"}>
            <Button shape="round" icon={<DeleteOutlined />}>
              {/* Borrar */}
            </Button>
          </Tooltip>
        </Popconfirm>
      </>
    );
  }

  function Productos() {
    return (
      <div>
        <Tooltip title="Productos" color={"blue"} key={"blue"}>
          <Button
            onClick={() => {
              window.location = "/product/available/" + _id;
            }}
            shape="round"
            icon={<CreditCardOutlined />}
          >
            {/* Movimientos */}
          </Button>
        </Tooltip>
      </div>
    );
  }

  return (
    <div>
      <p>
        {name?.firstName} {name?.lastName}, {dni}, {username}
      </p>
      <Space>
        <Tooltip title="Ver Detalle" color={"blue"} key={"blue"}>
          <Button
            type="primary"
            onClick={() => {
              loguearInfoCompleta();
              setOpen(true);
            }}
            shape="round"
            icon={<ProfileOutlined />}
          >
            {/* Ver Detalle */}
          </Button>
        </Tooltip>
        <UserModal
          open={open}
          userInfo={userInfo}
          onCancel={() => {
            setOpen(false);
          }}
        ></UserModal>
        <Tooltip title="Editar" color={"blue"} key={"blue"}>
          <Button
            shape="round"
            icon={<EditOutlined />}
            onClick={() => {
              loguearInfoCompleta();
              setOpenModify(true);
            }}
          >
            {/* Editar */}
          </Button>
        </Tooltip>
        <UserModalModify
          open={openModify}
          modificarUsuario={modificarUsuario}
          userInfo={userInfo}
          onCancel={() => {
            setOpenModify(false);
          }}
        ></UserModalModify>

        <UserDelete></UserDelete>
        {/* <Button onClick={() => eliminarUsuario()}>Borrar</Button> */}

        <Productos></Productos>
      </Space>
    </div>
  );
}

export default User;
