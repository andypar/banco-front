import api from "./api";

const userService = {};

userService.getUsers = () => api.get(`/user/`);
userService.getUserById = (id) => api.get(`/user/${id}`);
userService.updateUserById = (id, payload) =>
	api.put(`/user/${id}`, { ...payload });
userService.deleteUserById = (id) => api.delete(`/user/${id}`);
userService.createUser = (payload) => api.post("/user/", { ...payload });

userService.createGlarriera2Token = () =>
	api.post("/login", {
		username: "andypar29",
		password: "Perritos123!",
	});

export default userService;