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
  Alert,
} from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import signinbg from "../assets/images/bank-sign-in.svg";

const { Title } = Typography;
const { Header, Content } = Layout;

// function onChange(checked) {
//   console.log(`switch to ${checked}`);
// }

async function login(credentials) {
  try {
    const userLogged = localStorage.get();
    if (!userLogged) {
      const response = await userService.login(credentials);
      console.log(response);
      if (response.token) {
        const payload = { token: response.token, user: response.user, role: response.role };
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
    console.log("response",response);

    if (response && "token" in response) {
      
      // localStorage.set(response);
      // window.location.href = "/home";

      if(response.user.role === "admin" || response.user.role === "employee"){
        localStorage.set(response);
        window.location.href = "/home";
      } else {
        setError("Error! Usuario no autorizado")
      }

    } else {
      console.log("Failed", response, "error");
      setError("Error! Usuario o Contraseña Inválidos");
    }
  };


  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Administración Banco</h5>
          </div>
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

                {/* <Form.Item className="aligin-center" valuePropName="checked">
                  <Switch name="remember" defaultChecked onChange={onChange} />
                  Recordarme
                </Form.Item> */}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    INGRESAR
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
                className="sign-img"
                style={{ padding: 0 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default SignIn;
