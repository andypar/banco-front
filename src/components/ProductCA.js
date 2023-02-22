import { useState } from "react";
import "dayjs/locale/es";
import { Button, Form, Input, Modal, message } from "antd";

import productService from "../services/products";
import userService from "../services/users";

const CreateCA = ({ open, onCreate, onCancel }) => {
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
    </>
  );
};

function NewCA({
  productType,
  currencyType,
  userId,
  setProducts,
  setUserInfo,
}) {
  const [openCA, setopenCA] = useState(false);

  const error = (errorMessage) => {
    message.error("Error: ", errorMessage);
  };

  const onCreateCA = async (values) => {
    try {
      console.log("Received values of form: ", values);

      const newProduct = await productService.createProduct({
        overdraftAmount: 0,
        extractionLimit: values.extractionLimit,
        type: productType,
        currency: currencyType,
      });
      console.log("Response CA: ", newProduct);
      
      setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, "1000")

      const associate = await userService.associateUserProductById(
        userId,
        newProduct._id
      );
      console.log("Associate Product CA: ", associate);

      const productInfo = await productService.getUserAvailableProducts(userId);
      setProducts(productInfo);

      const userInfo = await userService.getUserById(userId);
      setUserInfo(userInfo);

      setopenCA(false);
    } catch (err) {
      console.log(err);
      error(err);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setopenCA(true);
        }}
        style={{ background: "#07ad1a" }}
      >
        Crear Producto
      </Button>
      <CreateCA
        open={openCA}
        onCreate={onCreateCA}
        onCancel={() => {
          setopenCA(false);
        }}
      />
    </>
  );
}

export default NewCA;
