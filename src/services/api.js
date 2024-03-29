import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import localStorage from "./localStorage";

function errorMessage(err) {
	if (err.response && err.response.status === 401) {
		localStorage.delete();
		<Navigate to="/sign-in" replace={true} />;
	}
	return err;
}


const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: process.env.REACT_APP_API_TIMEOUT,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		const data = localStorage.get();
		if (data) {
			// eslint-disable-next-line no-param-reassign
			console.log(data.token)
			config.headers.Authorization = `${data.token}`;
		} else {
			console.log('x')
		}
		return config;
	},
	(error) =>
		// Do something with request error
		Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
	(response) =>
		// Do something with response data
		response.data,
	(error) =>
		// Do something with response error
		Promise.reject(errorMessage(error))
);

export default api;