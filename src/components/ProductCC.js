import { useState } from "react";
import "dayjs/locale/es";
import { Button, Form, Input, Modal, message } from "antd";

import productService from "../services/products";
import userService from "../services/users";

const CreateCC = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        open={open}
        title="Nuevo Producto"
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
        <Form form={form} layout="vertical" name="form-create">
          <Form.Item
            name="overdraftAmount"
            label="Monto Sobregiro"
            rules={[
              {
                type: /^[0-9]*$/,
                message: "El valor ingresado debe ser numérico.",
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

          <Form.Item
            name="extractionLimit"
            label="Límite de Extracción Diario"
            rules={[
              {
                pattern: /^[0-9]*$/,
                message: "El valor ingresado debe ser numérico.",
              },
              {
                required: true,
                message: "Por favor ingrese el límite de extracción diario!",
              },
              {
                whitespace: true,
                message:
                  "El límite de extracción diari0 no debe quedar en blanco",
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
    </>
  );
};

function NewCC({productType, currencyType, userId, setProducts, setUserInfo}) {
  const [openCC, setopenCC] = useState(false);

  const error = (errorMessage) => {
    message.error("Error: ", errorMessage);
  };

  const onCreateCC = async (values) => {
    try {
      console.log("Received values of form: ", values);

      const newProduct = await productService.createProduct({
        overdraftAmount: values.overdraftAmount,
        extractionLimit: values.extractionLimit,
        type: productType,
        currency: currencyType,
      });
      console.log("Response CC: ", newProduct);

      const associate = await userService.associateUserProductById(
        userId,
        newProduct._id
      );
      console.log("Associate Product CC: ", associate);

      const productInfo = await productService.getUserAvailableProducts(userId);
      setProducts(productInfo);

      const userInfo = await userService.getUserById(userId);
      setUserInfo(userInfo);

      setopenCC(false);
    } catch (err) {
      error(err);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setopenCC(true);
        }}
      >
        Crear Producto
      </Button>
      <CreateCC
        open={openCC}
        onCreate={onCreateCC}
        onCancel={() => {
          setopenCC(false);
        }}
      />
    </>
  );
}

export default NewCC;
