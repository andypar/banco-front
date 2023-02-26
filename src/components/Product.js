import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Space,
  Alert,
  Popconfirm,
  Tooltip,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ProfileOutlined,
  DollarOutlined,
  MailOutlined,
} from "@ant-design/icons";
import productService from "../services/products";
import userService from "../services/users";

function Product({
  productId,
  productType,
  currencyType,
  userId,
  setUserInfo,
  setProducts,
}) {
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [msg, setMsg] = useState();

  const loguearInfoCompleta = async () => {
    const productInfo = await productService.getProductById(productId);
    setProductInfo(productInfo);
    console.log("productInfo: ", productInfo);
  };

  const modificarProducto = async (values) => {
    if (productType.description === "caja-ahorro") {
      try {
        const response = await productService.updateProductById(productId, {
          type: productType.description,
          currency: currencyType.description,
          alias: values.alias,
          overdraftAmount: 0,
          extractionLimit: values.extractionLimit,
        });
        console.log("Response: ", response);
        setOpenModify(false);
      } catch (err) {
        console.log("There was an error update product ", productId);
        setMsg(err.response.data);
      }
    } else {
      try {
        const response = await productService.updateProductById(productId, {
          type: productType.description,
          currency: currencyType.description,
          alias: values.alias,
          overdraftAmount: values.overdraftAmount,
          extractionLimit: values.extractionLimit,
        });
        console.log("Response: ", response);
        setOpenModify(false);
      } catch (err) {
        console.log("There was an error update product ", productId);
        console.log(err);
      }
    }
  };

  const eliminarProducto = async () => {
    try {
      const response = await productService.deleteProductById(productId);
      console.log("Response: ", response);
      console.log(userId);

      const userInfo = await userService.getUserById(userId);
      setUserInfo(userInfo);

      const productInfo = await productService.getUserAvailableProducts(userId);
      setProducts(productInfo);
    } catch (err) {
      console.log("There was an error deleting product ", productId);
      console.log(err);
    }
  };

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
            <p>Saldo: ${productInfo.balanceAmount}</p>
            {productInfo?.type?.description === "caja-ahorro" ? (
              <p></p>
            ) : (
              <p>Monto Sobregiro: ${productInfo.overdraftAmount} </p>
            )}
            <p>Límite Extracción Diaria: ${productInfo.extractionLimit}</p>
          </div>
        </div>
      </Modal>
    );
  }

  function ProductModalModify({
    open,
    productInfo,
    modificarProducto,
    onCancel,
  }) {
    const [form] = Form.useForm();

    return (
      <Modal
        open={open}
        title="Modificar Producto"
        okText="Modificar"
        cancelText="Cancelar"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              modificarProducto(values);
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
        {msg ? <Alert type="error" message={msg} banner /> : null}
        <Form
          form={form}
          layout="vertical"
          name="form-modify"
          initialValues={{
            remember: true,
            alias: productInfo.alias,
            overdraftAmount: productInfo.overdraftAmount?.toString(),
            extractionLimit: productInfo.extractionLimit?.toString(),
          }}
        >
          <Form.Item
            name="alias"
            label="Alias"
            rules={[
              { type: "string" },
              {
                required: true,
                message: "Por favor ingrese el alias!",
              },
              {
                whitespace: true,
                message: "El alias no debe quedar en blanco",
              },
              {
                min: 5,
                max: 25,
                message:
                  "El alias debe tener al menos 5 caracteres y máximo 25",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          {productInfo?.type?.description === "caja-ahorro" ? (
            ""
          ) : (
            <Form.Item
              name="overdraftAmount"
              label="Monto Sobregiro"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Por favor ingrese el monto de sobregiro!",
                },
                {
                  whitespace: true,
                  message: "El monto de sobregiro no debe quedar en blanco",
                },
                {
                  min: 4,
                  max: 5,
                  message: "El sobregiro debe ser entre $1.000 y $50.000",
                },
              ]}
            >
              <Input placeholder="Monto Sobregiro" />
            </Form.Item>
          )}

          <Form.Item
            name="extractionLimit"
            label="Límite de Extracción Diario"
            rules={[
              {
                type: "string",
              },
              {
                required: true,
                message: "Por favor ingrese el límite de extracción diario!",
              },
              {
                whitespace: true,
                message:
                  "El límite de extracción diario no debe quedar en blanco",
              },
              {
                min: 4,
                max: 6,
                message:
                  "El límite de extracción diario debe ser entre $1.000 y $100.000",
              },
            ]}
          >
            <Input placeholder="Límite de Extracción Diario" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  function ProductDelete() {
    const text = "Segur@ que quieres borrar el producto?";
    const confirm = () => eliminarProducto();

    return (
      <>
        <Popconfirm
          title={text}
          onConfirm={confirm}
          okText="Si"
          cancelText="No"
          okButtonProps={{ size: "medium" }}
          cancelButtonProps={{ size: "medium" }}
        >
          <Tooltip title="Borrar" color={"blue"} key={"blue1"}>
            <Button shape="round" icon={<DeleteOutlined />}>
              {/* Borrar */}
            </Button>
          </Tooltip>
        </Popconfirm>
      </>
    );
  }

  function Movimientos() {
    return (
      <div>
        {/* <Tooltip title="Transacciones" color={"blue"} key={"blue2"}> */}
          <Button
            onClick={() => {
              window.location = "/movement/" + productId;
            }}
            shape="round"
            icon={<DollarOutlined />}
          >
            Transacciones
          </Button>
        {/* </Tooltip> */}
      </div>
    );
  }

  function Resumen() {
    return (
      <div>
        {/* <Tooltip title="Resumen" color={"blue"} key={"blue2"}> */}
          <Button
            onClick={() => {
              window.location = "/extract/" + userId + "/" + productId;
            }}
            shape="round"
            icon={<MailOutlined />}
          >
            Resumen
          </Button>
        {/* </Tooltip> */}
      </div>
    );
  }

  return (
    <div>
      <Space>
        <Row gutter={[10, 10]}>
          <Col>
            <Tooltip title="Ver Detalle" color={"blue"} key={"blue3"}>
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
          </Col>
          <Col>
            <ProductModal
              open={open}
              productInfo={productInfo}
              onCancel={() => {
                setOpen(false);
              }}
            ></ProductModal>
          </Col>
          <Col>
            <Tooltip title="Editar" color={"blue"} key={"blue4"}>
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
          </Col>
          <Col>
            <ProductModalModify
              open={openModify}
              modificarProducto={modificarProducto}
              productInfo={productInfo}
              onCancel={() => {
                setOpenModify(false);
              }}
            ></ProductModalModify>
          </Col>

          <Col>
            <ProductDelete></ProductDelete>
          </Col>
          <Col>
            <Movimientos></Movimientos>
          </Col>
          <Col>
            <Resumen></Resumen>
          </Col> 
        </Row>
      </Space>
    </div>
  );
}

export default Product;
