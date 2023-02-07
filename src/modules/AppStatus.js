
import { useState, useEffect } from "react";
import userService from "../services/users";
import localStorage from "../services/localStorage";

function AppStatus() {

	const [token, setToken] = useState({});
	useEffect(() => {
		async function login() {
			try {
				const userLogged = localStorage.get();
				if (!userLogged) {
					// const response = await userService.createGlarriera2Token();
					const response = await userService.login();
					console.log(response)
					if (response.token) {
						const payload = { token: response.token, user: response.user };
						localStorage.set(payload);
						setToken(payload);
					}
				} else {
					console.log("User logged: ", userLogged.user);
					setToken(userLogged);
				}
			} catch (err) {
				console.log("Error trying to get user token. Error: ", err);
			}
		}
		login();
	}, []);

	// return <div>{JSON.stringify(status)}</div>;
	return (<div>{JSON.stringify(token)}</div>);
}

export default AppStatus;