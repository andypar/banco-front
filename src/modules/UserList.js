import { useState, useEffect } from "react";
import "dayjs/locale/es";
import User from "../components/User";
import { MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message, DatePicker, Radio } from "antd";
import { LanguageContext } from "../context/LanguageContext";
import { useContext } from "react";
import userService from "../services/users";
import dayjs from "dayjs";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
const genderOptions = ["Femenino", "Masculino", "Indeterminado"];
const personTypeOptions = ["Física", "Jurídica"];

const CreateUser = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Registrar Usuario"
      okText="Crear"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form-create"
        initialValues={{
          modifier: "public",
          gender: "Femenino",
          personType: "Física",
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
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Género"
          rules={[
            { type: "gender" },
            {
              required: true,
              message: "Please input the gender!",
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
          name="dni"
          label="DNI"
          rules={[
            {
              pattern: /^[0-9]*$/,
              message:
                "El valor ingresado debe ser numérico, sin caracteres especiales!",
            },
            {
              whitespace: true,
              message: "El DNI no debe quedar en blanco",
            },
            {
              required: true,
              message: "Por favor ingrese el DNI!",
            },
            {
              min: 7,
              max: 9,
              message: "El DNI debe tener al menos 7 caracteres",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="cuilCuit"
          label="CUIL/CUIT"
          rules={[
            {
              pattern: /^[0-9]*$/,
              message:
                "El valor ingresado debe ser numérico, sin caracteres especiales!",
            },
            {
              whitespace: true,
              message: "El CUIL/CUIT no debe quedar en blanco",
            },
            {
              required: true,
              message: "Por favor ingrese el CUIL/CUIT!",
            },
            {
              min: 10,
              max: 13,
              message: "El CUIL/CUIT debe tener al menos 10 caracteres",
            },
          ]}
        >
          <Input />
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
              <MailOutlined type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
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

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { type: "password" },
            {
              required: true,
              message: "Por favor ingrese la contraseña!",
            },
            {
              pattern:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
              message:
                "La contraseña debe ser una combinación de una mayúscula, una minúscula, un carácter especial, un dígito y un mínimo de 8, un máximo de 20 caracteres de largo",
            },
          ]}
        >
          <Input.Password
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          name="personType"
          label="Tipo Persona"
          rules={[
            { type: "personType" },
            {
              required: true,
              message: "Please input the personType!",
            },
          ]}
        >
          <Radio.Group options={personTypeOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function UserList() {
  const [users, setUsers] = useState([]);

  const { language } = useContext(LanguageContext);

  const [open, setOpen] = useState(false);
  const error = (errorMessage) => {
    message.error("Error: ", errorMessage);
  };

  const onCreate = async (values) => {
    try {
      console.log("Received values of form: ", values);

      const newUser = await userService.createUser({
        name: { firstName: values.firstName, lastName: values.lastName },
        gender: values.gender.toLowerCase(),
        dni: values.dni,
        dateBirth: dayjs(values.dateBirth.toDate()).format("YYYY-MM-DD"),
        email: values.email,
        password: values.password,
        username: values.username,
        telephone: values.telephone,
        personType: values.personType,
        cuilCuit: values.cuilCuit,
        roleType: "user",
        isActive: true,
      });
      setUsers([...users, newUser]);
      console.log("Response: ", newUser);
      setOpen(false);
    } catch (err) {
      error(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await userService.getUsers();
      setUsers(response);
    }
    fetchData();
  }, []);

  return (
    <>
      <p>{language}</p>
      {/* <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Crear Usuario
      </Button>
      <CreateUser
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
      {users.map((x) => (
        <User
          key={x._id}
          data={x}
          usersList={users}
          setUsersList={setUsers}
        ></User>
      ))}
    </>
  );
}

export default UserList;
