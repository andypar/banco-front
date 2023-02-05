import { useState, useEffect } from "react";
import "dayjs/locale/es";
import User from "../components/User";
import { Button, Form, Input, Modal, message, DatePicker, Radio } from "antd";
import { LanguageContext } from "../context/LanguageContext";
import { useContext } from "react";
import userService from "../services/users";
import dayjs from "dayjs";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
const genderOptions = ['Femenino', 'Masculino', 'Indeterminado'];
const personTypeOptions = ['Física', 'Jurídica'];


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
          gender:"Femenino",
          personType:"Física"
        }}
      >
        <Form.Item
          name="firstName"
          label="Nombre/s"
          rules={[
            { type: "firstName" },
            {
              required: true,
              message: "Please input the firstName!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Apellido/s"
          rules={[
            { type: "lastName" },
            {
              required: true,
              message: "Please input the lastName!",
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

        <Form.Item label="Fecha de Nacimiento" name="dateBirth">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="telephone"
          label="Teléfono"
          rules={[
            { type: "telephone" },
            {
              required: true,
              message: "Please input the telephone!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dni"
          label="DNI"
          rules={[
            { type: "dni" },
            {
              required: true,
              message: "Please input the dni!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="cuilCuit"
          label="CUIL/CUIT"
          rules={[
            { type: "cuilCuit" },
            {
              required: true,
              message: "Please input the cuilCuit!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email" },
            {
              required: true,
              message: "Please input the email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Usuario"
          rules={[
            { type: "username" },
            {
              required: true,
              message: "Please input the username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { type: "password" },
            {
              required: true,
              message: "Please input the password!",
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
          <Radio.Group options={personTypeOptions}/>
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
    <div>
      <p>{language}</p>
      <Button
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
      />
      {users.map((x) => (
        <User
          key={x._id}
          data={x}
          usersList={users}
          setUsersList={setUsers}
        ></User>
      ))}
    </div>
  );
}

export default UserList;
