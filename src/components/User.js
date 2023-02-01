import { useState } from "react";
import { Button, Modal } from "antd";
import userService from "../services/users";

function User({ data, userList, setUserList }) {
  const { userName, _id } = data;
  const [userNameModified, setUserNameModified] = useState(data.username);
  const [cuitCuil, setCuitCuil] = useState("");
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const loguearInfoCompleta = async () => {
    //data: userInfo } = await userService.getUserById(_id);
    const userInfo = await userService.getUserById(_id);
    setCuitCuil(userInfo.cuilCuit);
    setUserInfo(userInfo);
    console.log("userInfo: ", userInfo);
  };

  const modificarUsuario = async () => {
    const response = await userService.updateUserById(_id, {
      userName: userNameModified,
    });
    console.log("Response: ", response);
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

  function UserModal({ open, userInfo, onCancel }) {
    return (
      <Modal open={open} title="Detalle del usuario" onCancel={onCancel}>
        <div>
          <h4>
            Fecha de Nacimiento: <p>{userInfo.dateBirth}</p>
          </h4>
          <h4>
            e-Mail: <p>{userInfo.email}</p>
          </h4>
        </div>
      </Modal>
    );
  }

  return (
    <div>
      <p>{userName}</p>
      <h4>
        CUIL: <p>{cuitCuil}</p>
      </h4>
      <input
        value={userNameModified}
        onChange={(e) => setUserNameModified(e.target.value)}
      />
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

      <button onClick={() => modificarUsuario()}>Modificar</button>
      <Button danger disabled={true} onClick={() => eliminarUsuario()}>
        Borrar
      </Button>
    </div>
  );
}

export default User;
