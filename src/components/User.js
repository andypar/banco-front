import { useState } from "react";
import { Button, Modal } from "antd";
import userService from "../services/users";
import moment from "moment";
import "moment/locale/es";

function User({ data, userList, setUserList }) {
  const { dni, name, username, _id } = data;
  const [firstNameModified, setFirstNameModified] = useState(data.firstName);
  const [lastNameModified, setLastNameModified] = useState(data.lastName);
  const [dateBirthModified, setDateBirthModified] = useState(data.dateBirth);
  const [usernameModified, setUsernameModified] = useState(data.username);
  const [emailModified, setEmailModified] = useState(data.email);
  const [telephoneModified, setTelephoneModified] = useState(data.telephone);
  const [genderModified, setGenderModified] = useState(data.gender);
  const [personTypeModified, setPersonTypeModifiedeModified] = useState(
    data.personType
  );
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const loguearInfoCompleta = async () => {
    //const { data: userInfo } = await userService.getUserById(_id);
    const userInfo = await userService.getUserById(_id);
    setUserInfo(userInfo);
    console.log("userInfo: ", userInfo);
  };

  const modificarUsuario = async () => {
    try {
      const response = await userService.updateUserById(_id, {
        name:{firstName: firstNameModified,
        lastName: lastNameModified
        },
        dateBirth: dateBirthModified,
        email: emailModified,
        username: usernameModified,
        telephone: telephoneModified,
        gender: genderModified,
        personType: personTypeModified,
      });
      console.log("Response: ", response);
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
          <p>Fecha de Nacimiento: {moment(userInfo.dateBirth).format("L")}</p>
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

  function UserModalModify({ open, onFinish, userInfo, onCancel }) {
    return (
      <Modal
        open={open}
        title="Modificar usuario"
        onCancel={onCancel}
        onOk={onFinish}
      >
        <input
          value={firstNameModified}
          onChange={(e) => setFirstNameModified(e.target.value)}
        />
        <input
          value={lastNameModified}
          onChange={(e) => setLastNameModified(e.target.value)}
        />
        <input
          value={dateBirthModified}
          onChange={(e) => setDateBirthModified(e.target.value)}
        />
        <input
          value={genderModified}
          onChange={(e) => setGenderModified(e.target.value)}
        />
        <input
          value={usernameModified}
          onChange={(e) => setUsernameModified(e.target.value)}
        />
        <input
          value={emailModified}
          onChange={(e) => setEmailModified(e.target.value)}
        />
        <input
          value={telephoneModified}
          onChange={(e) => setTelephoneModified(e.target.value)}
        />
        <input
          value={personTypeModified}
          onChange={(e) => setPersonTypeModifiedeModified(e.target.value)}
        />
        <Button onClick={() => modificarUsuario()}>Modificar</Button>
      </Modal>
    );
  }

  return (
    <div>
      <p>
        {name?.firstName} {name?.lastName}, {dni}, {username}
      </p>
      {/* <input
        value={usernameModified}
        onChange={(e) => setUsernameModified(e.target.value)}
      /> */}
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
        handleOk={() => {
          setOpen(false);
        }}
      ></UserModal>

      <Button
        onClick={() => {
          loguearInfoCompleta();
          setFirstNameModified(userInfo?.name?.firstName);
          setLastNameModified(userInfo?.name?.lastName);
          setDateBirthModified(userInfo.dateBirth);
          setGenderModified(userInfo?.gender?.description);
          setUsernameModified(userInfo.username);
          setEmailModified(userInfo.email);
          setTelephoneModified(userInfo.telephone);
          setPersonTypeModifiedeModified(userInfo?.personType?.description);
          setOpenModify(true);
        }}
      >
        Modificar2
      </Button>
      <UserModalModify
        open={openModify}
        userInfo={userInfo}
        onCancel={() => {
          setOpenModify(false);
        }}
      ></UserModalModify>

      <Button onClick={() => modificarUsuario()}>Modificar</Button>
      <Button onClick={() => eliminarUsuario()}>Borrar</Button>
    </div>
  );
}

export default User;
