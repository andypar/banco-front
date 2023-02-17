import { useState } from "react";
import "dayjs/locale/es";
import { Button, Form, Input, Modal, message } from "antd";

import movementService from "../services/movements";
import productService from "../services/products";

const CreateExtraction = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        open={open}
        title="Extraccción"
        okText="Ok"
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
            name="balance"
            label="Monto a Extraer"
            rules={[
              {
                pattern: /^[0-9]*$/,
                message: "El valor ingresado debe ser numérico.",
              },
              {
                required: true,
                message: "Por favor ingrese el monto a extraer!",
              },
              {
                whitespace: true,
                message: "El monto a extraer no debe quedar en blanco",
              },
              {
                min: 2,
                max: 6,
                message: "El monto a extraer debe ser entre $1.000 y $100.000",
              },
            ]}
          >
            <Input placeholder="Monto de Extracción" />
          </Form.Item>

          <Form.Item
            name="descriptionMovement"
            label="Descripción"
            rules={[
              {
                type: "string",
              },
              {
                required: true,
                message: "Por favor ingrese la descripción!",
              },
              {
                whitespace: true,
                message: "La descripción no puede quedar en blanco",
              },
            ]}
          >
            <Input placeholder="Descripción Movimento" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

function NewExtraction({ productId, setProducts }) {
  const [openEXT, setopenEXT] = useState(false);

  const error = (errorMessage) => {
    message.error("Error: ", errorMessage);
  };

  const onCreateExtraction = async (values) => {
    try {
      console.log("Received values of form: ", values);

      const newExtraction = await movementService.createExtractionMovement(
        productId,
        {
          balance: values.balance,
          descriptionMovement: values.descriptionMovement,
          type: "extracción",
        }
      );
      console.log("Response Extraction: ", newExtraction);

      const productInfo = await productService.getProductById(productId);
      console.log("Extraction ProductInfo: ", productInfo);
      setProducts(productInfo);
      setopenEXT(false);
    } catch (err) {
      console.log(err);
      error(err);
    }
  };

  return (
    <>
      <Button
        type="primary"
        style={{ background: "#7303fc" }}
        onClick={() => {
          setopenEXT(true);
        }}
      >
        Extraer
      </Button>
      <CreateExtraction
        open={openEXT}
        onCreate={onCreateExtraction}
        onCancel={() => {
          setopenEXT(false);
        }}
      />
    </>
  );
}

export default NewExtraction;
