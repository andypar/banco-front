
import { useState } from "react";
import { Button } from "antd";
import userService from "../services/users";

function User({ data, userList, setUserList }) {

	const { userName, _id } = data;
	const [userNameModified, setUserNameModified] = useState(data.username);
	const [userInfo, setUserInfo]=useState(null);

	const loguearInfoCompleta = async () => {
		// const { data: userInfo } = await userService.getUserById(_id);
		const user = await userService.getUserById(_id);
		console.log("userInfo: ", user);
		setUserInfo(user.data);
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

	return (
		<div>
			<p>{userName}</p>
			<input
				value={userNameModified}
				onChange={(e) => setUserNameModified(e.target.value)}
			/>
			<Button type="primary" onClick={() => loguearInfoCompleta()}>
				Ver Detalle
			</Button>
			{userInfo}
			<button onClick={() => modificarUsuario()}>Modificar</button>
			<Button danger disabled={true} onClick={() => eliminarUsuario()}>
				Borrar
			</Button>
		</div>
	);
}

export default User;