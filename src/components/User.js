import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import userService from "../services/users";
import "dayjs/locale/es";
import dayjs from "dayjs";

function User({ data, userList, setUserList }) {
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
        personType: values.personType,
        cuilCuit: values.cuilCuit,
      });
      console.log("Response: ", response);
      setOpenModify(false);
    } catch (err) {
      console.log("There was an error update user ", _id);
      console.log(err);
    }
  };

  const eliminarUsuario = async () => {
    try {
      const response = await userService.deleteUserById(_id);
      setUserList(userList.filter((x) => x._id !== _id));
      console.log("Response: ", response);
    } catch (err) {
      console.log("There was an error deleting user ", _id);
      console.log(err);
    }
  };

  function UserModal({ open, userInfo, onCancel, handleOk }) {
    return (
      <Modal
        open={open}
        title="Detalle del usuario"
        onCancel={onCancel}
        onOk={handleOk}
      >
        <div>
          <p>
            Nombre: {userInfo?.name?.firstName} {userInfo?.name?.lastName}
          </p>
          <p>DNI: {userInfo.dni}</p>
          <p>Fecha de Nacimiento: {dayjs(userInfo.dateBirth).format("YYYY-MM-DD")}</p>
          <p>Género: {userInfo?.gender?.description.toUpperCase()}</p>
          <p>Usuario: {userInfo.username}</p>
          <p>E-mail: {userInfo.email}</p>
          <p>Teléfono: {userInfo.telephone}</p>
          <p>Cuil/Cuit: {userInfo.cuilCuit}</p>
          <p>
            Tipo de Persona: {userInfo?.personType?.description.toUpperCase()}
          </p>
        </div>
      </Modal>
    );
  }

  function UserModalModify({ open, userInfo, modificarUsuario, onCancel }) {
    const [form] = Form.useForm();

    useEffect(() => {
      form.setFieldsValue({
        username: userInfo.username,
        firstName: userInfo?.name?.firstName,
        lastName: userInfo?.name?.lastName,
        gender: userInfo?.gender?.description,
        email: userInfo.email,
        dateBirth: dayjs(new Date(userInfo.dateBirth)),
        telephone: userInfo.telephone,
        cuilCuit: userInfo.cuilCuit,
        personType: userInfo?.personType?.description,
      });
    });

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
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            remember: true,
            dateBirth: dayjs(),
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
            <Input />
          </Form.Item>

          <Form.Item label="Fecha de Nacimiento" name="dateBirth">
            <DatePicker format="YYYY/MM/DD" />
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  return (
    <div>
      <p>
        {name?.firstName} {name?.lastName}, {dni}, {username}
      </p>
      <Button
        type="primary"
        onClick={() => {
          loguearInfoCompleta();
          setOpen(true);
        }}
      >
        Ver Detalle
      </Button>
      <UserModal
        open={open}
        userInfo={userInfo}
        onCancel={() => {
          setOpen(false);
        }}
      ></UserModal>

      <Button
        onClick={() => {
          loguearInfoCompleta();
          setOpenModify(true);
        }}
      >
        Modificar
      </Button>
      <UserModalModify
        open={openModify}
        modificarUsuario={modificarUsuario}
        userInfo={userInfo}
        onCancel={() => {
          setOpenModify(false);
        }}
      ></UserModalModify>

      <Button onClick={() => eliminarUsuario()}>Borrar</Button>
    </div>
  );
}

export default User;
