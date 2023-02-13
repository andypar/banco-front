import { useState } from "react";
import { MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Radio,
  Alert,
} from "antd";
import productService from "../services/products";

function Product({ productId }) {
  // const { dni, name, username, _id } = data;
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [productInfo, setProductInfo] = useState({});

  const loguearInfoCompleta = async () => {
    console.log(productId);
    const productInfo = await productService.getProductById(productId);
    setProductInfo(productInfo);
    console.log("productInfo: ", productInfo);
  };

  const modificarProducto = async (values) => {
    try {
      const response = await productService.updateProductById(productId, {
        alias: values.alias,
        overdraftAmount: values.overdraftAmount,
        extractionLimit: values.extractionLimit,
      });
      console.log("Response: ", response);
      setOpenModify(false);
    //   const usuarios = await productService.getAllPersons();
    //   productService(usuarios);
    } catch (err) {
      console.log("There was an error update product ", productId);
      console.log(err);
    }
  };

  // const eliminarUsuario = async () => {
  //   try {
  //     const response = await userService.deleteUserById(_id);
  //     // setUsersList(usersList.filter((x) => x._id !== _id));
  //     const usuarios = await userService.getAllPersons();
  //     setUsersList(usuarios);
  //     console.log("Response: ", response);
  //   } catch (err) {
  //     console.log("There was an error deleting user ", _id);
  //     console.log(err);
  //   }
  // };

  function ProductModal({ open, productInfo, onCancel }) {
    return (
      <Modal
        open={open}
        okText="Ok"
        onOk={onCancel}
        title="Detalle del Producto"
        cancelText="Cancelar"
        onCancel={onCancel}
        footer={null}
      >
        <div>
          <div>
            <p>Nro. Cuenta: {productInfo.accountNumber}</p>
            <p>CBU: {productInfo.cbu}</p>
            <p>Alias: {productInfo.alias}</p>
            <p>Saldo: {productInfo.balanceAmount}</p>
            {productInfo?.type?.description === "caja-ahorro" ? (
              <p></p>
            ) : (
              <p>Monto Sobregiro: {productInfo.overdraftAmount} </p>
            )}
            <p>Límite Extracción Diaria: {productInfo.extractionLimit}</p>
          </div>
        </div>
      </Modal>
    );
  }

//   function UserModalModify({ open, userInfo, modificarUsuario, onCancel }) {
//     const [form] = Form.useForm();

//     return (
//       <Modal
//         open={open}
//         title="Modificar Usuario"
//         okText="Modificar"
//         cancelText="Cancelar"
//         onCancel={onCancel}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               modificarUsuario(values);
//             })
//             .catch((info) => {
//               <Alert
//                 type="error"
//                 message="Ha ocurrido un error"
//                 description={info}
//                 closable
//               ></Alert>;
//               console.log("Validate Failed:", info);
//             });
//         }}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="form-modify"
//           initialValues={{
//             remember: true,
//             dateBirth: dayjs(userInfo.dateBirth),
//             username: userInfo.username,
//             firstName: userInfo?.name?.firstName,
//             lastName: userInfo?.name?.lastName,
//             gender: userInfo?.gender?.description,
//             email: userInfo.email,
//             telephone: userInfo.telephone,
//             cuilCuit: userInfo.cuilCuit,
//             personType: userInfo?.personType?.description,
//           }}
//         >
//           <Form.Item
//             name="firstName"
//             label="Nombre/s"
//             rules={[
//               { type: "string" },
//               {
//                 required: true,
//                 message: "Por favor ingrese el primer nombre!",
//               },
//               {
//                 whitespace: true,
//                 message: "El primer nombre no debe quedar en blanco",
//               },
//               {
//                 min: 3,
//                 max: 100,
//                 message: "El primer nombre debe tener al menos 3 caracteres",
//               },
//             ]}
//             hasFeedback
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="lastName"
//             label="Apellido/s"
//             rules={[
//               { type: "string" },
//               {
//                 required: true,
//                 message: "Por favor ingrese el apellido!",
//               },
//               {
//                 whitespace: true,
//                 message: "El apellido no debe quedar en blanco",
//               },
//               {
//                 min: 3,
//                 max: 100,
//                 message: "El apellido debe tener al menos 3 caracteres",
//               },
//             ]}
//             hasFeedback
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="dateBirth"
//             label="Fecha de Nacimiento"
//             rules={[
//               { type: "date" },
//               {
//                 required: true,
//                 message: "Por favor ingrese la fecha de nacimiento!",
//               },
//             ]}
//             hasFeedback
//           >
//             <DatePicker
//               format="DD/MM/YYYY"
//               disabledDate={(d) => !d || d.isAfter(new Date())}
//             />
//           </Form.Item>

//           <Form.Item
//             name="telephone"
//             label="Teléfono"
//             rules={[
//               {
//                 pattern: /^[0-9]*$/,
//                 message: "El valor ingresado debe ser numérico!",
//               },
//               {
//                 whitespace: true,
//                 message: "El teléfono no debe quedar en blanco",
//               },
//               {
//                 required: true,
//                 message: "Por favor ingrese el teléfono!",
//               },
//               {
//                 min: 8,
//                 max: 12,
//                 message: "El teléfono debe tener al menos 8 caracteres",
//               },
//             ]}
//             hasFeedback
//           >
//             <Input
//               prefix={
//                 <PhoneOutlined
//                   type="number"
//                   style={{ color: "rgba(0,0,0,.25)" }}
//                 />
//               }
//               placeholder="Teléfono"
//             />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[
//               {
//                 type: "email",
//                 message: "El email ingresado tiene un formato inválido!",
//               },
//               {
//                 whitespace: true,
//                 message: "El email no debe quedar en blanco",
//               },
//               {
//                 required: true,
//                 message: "Por favor ingrese el mail!",
//               },
//             ]}
//             hasFeedback
//           >
//             <Input
//               prefix={
//                 <MailOutlined
//                   type="mail"
//                   style={{ color: "rgba(0,0,0,.25)" }}
//                 />
//               }
//               placeholder="Email"
//             />
//           </Form.Item>

//           <Form.Item
//             name="username"
//             label="Usuario"
//             rules={[
//               { type: "string" },
//               {
//                 required: true,
//                 message: "Please input the username!",
//               },
//               {
//                 min: 5,
//                 max: 50,
//                 message: "El usuario debe tener al menos 5 caracteres",
//               },
//             ]}
//           >
//             <Input
//               prefix={
//                 <UserOutlined
//                   type="username"
//                   style={{ color: "rgba(0,0,0,.25)" }}
//                 />
//               }
//               placeholder="Usuario"
//             />
//           </Form.Item>

//           {/* <Form.Item
//             name="personType"
//             label="Tipo Persona"
//             rules={[
//               { type: "string" },
//               {
//                 required: true,
//                 message: "Por favor ingrese el tipo de persona!",
//               },
//             ]}
//           >
//             <Radio.Group options={personTypeOptions} />
//           </Form.Item> */}
//         </Form>
//       </Modal>
//     );
//   }

  return (
    <div>
      {/* <p>
          {name?.firstName} {name?.lastName}, {dni}, {username}
        </p>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              loguearInfoCompleta();
              setOpen(true);
            }}
          >
            Ver Detalle
          </Button> */}
      <Button
        type="primary"
        onClick={() => {
          loguearInfoCompleta();
          setOpen(true);
        }}
      >
        Ver Detalle
      </Button>
      <ProductModal
        open={open}
        productInfo={productInfo}
        onCancel={() => {
          setOpen(false);
        }}
      ></ProductModal>

      {/* <Button
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
  
          <Productos></Productos>
  
        </Space> */}
    </div>
  );
}

export default Product;
