import { useState } from "react";
import "dayjs/locale/es";
import { Button, Form, Input, Modal, message } from "antd";

import movementService from "../services/movements";
import productService from "../services/products";

const CreateDeposit = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        open={open}
        title="Depósito"
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
            label="Monto a Depositar"
            rules={[
              {
                pattern: /^[0-9]*$/,
                message: "El valor ingresado debe ser numérico.",
              },
              {
                required: true,
                message: "Por favor ingrese el monto a depositar!",
              },
              {
                whitespace: true,
                message: "El monto a depositar no debe quedar en blanco",
              },
              {
                min: 1,
                max: 6,
                message:
                  "El monto a depositar debe ser entre $1.000 y $100.000",
              },
            ]}
          >
            <Input placeholder="Monto de Depósito" />
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

function NewDeposit({ productId, setProducts }) {
  const [openDEP, setopenDEP] = useState(false);

  const error = (errorMessage) => {
    message.error("Error: ", errorMessage);
  };

  const onCreateDeposit = async (values) => {
    try {
      console.log("Received values of form: ", values);

      const newDeposit = await movementService.createDepositMovement(
        productId,
        {
          balance: values.balance,
          descriptionMovement: values.descriptionMovement,
          type: "depósito",
        }
      );
      console.log("Response Deposit: ", newDeposit);

      const productInfo = await productService.getProductById(productId);
      setProducts(productInfo);

      console.log(productInfo);

      setopenDEP(false);
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
          setopenDEP(true);
        }}
      >
        Depositar
      </Button>
      <CreateDeposit
        open={openDEP}
        onCreate={onCreateDeposit}
        onCancel={() => {
          setopenDEP(false);
        }}
      />
    </>
  );
}

export default NewDeposit;
