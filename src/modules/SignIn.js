import userService from "../services/users";
import localStorage from "../services/localStorage";
import React, { useState } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Alert,
} from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Content } = Layout;

// const template = [
//   <svg
//     key="1"
//     data-v-4ebdc598=""
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       data-v-4ebdc598=""
//       d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
//       fill="#111827"
//       className="fill-muted"
//     ></path>
//     <path
//       data-v-4ebdc598=""
//       d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
//       fill="#111827"
//       className="fill-muted"
//     ></path>
//     <path
//       data-v-4ebdc598=""
//       d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
//       fill="#111827"
//       className="fill-muted"
//     ></path>
//   </svg>,
// ];

async function login(credentials) {
  try {
    const userLogged = localStorage.get();
    if (!userLogged) {
      const response = await userService.login(credentials);
      console.log(response);
      if (response.token) {
        const payload = { token: response.token, user: response.user };
        return payload;
      }
    } else {
      console.log("User logged: ", userLogged.user);
      return userLogged;
    }
  } catch (err) {
    console.log("Error trying to get user token. Error: ", err);
    return err;
  }
}

function SignIn() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    const response = await login({
      username: username,
      password: password,
    });
    console.log(response);
    debugger
    if (response && "token" in response) {
      localStorage.set(response);
      window.location.href = "/";
    } else {
      console.log("Failed", response, "error");
      setError("Error! Usuario o Contraseña Inválidos");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Administración Banco</h5>
          </div>
          {/* <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/dashboard">
                  {template}
                  <span> Inicio</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div> */}
        </Header>
        <Content className="signin">
          {error ? <Alert type="error" message={error} banner /> : null}
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Iniciar Sesión</Title>
              <Form
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Usuario"
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su usuario!",
                    },
                  ]}
                >
                  <Input placeholder="Usuario" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Contraseña"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su contraseña!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Contraseña"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item className="aligin-center" valuePropName="checked">
                  <Switch name="remember" defaultChecked onChange={onChange} />
                  Recordarme
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    INGRESAR
                  </Button>
                  {/* {error?<Title>{error}</Title>:null}  */}
                  {/* {error ? <Alert message={error} type="error" /> : null} */}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default SignIn;
