import api from "./api";

const userService = {};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
  }

userService.getUsers = () => api.get(`/user/`);
userService.getAllCompanies = () => api.get(`/user/company`);
userService.getAllPersons = () => api.get(`/user/users`);
// userService.getUserById = (id) => api.get(`/user/${id}`);
userService.updateUserById = (id, payload) => api.put(`/user/${id}`, { ...payload });
userService.deleteUserById = (id) => api.delete(`/user/${id}`);
userService.createUser = (payload) => api.post("/user/", { ...payload });

// Modifico para que levante bien el genero y tipo de persona
userService.getUserById = async function (id) { 
	const userInfo= await api.get(`/user/${id}`)
	console.log(userInfo)
	userInfo.gender.description=capitalizeFirstLetter(userInfo?.gender?.description)
	userInfo.personType.description=capitalizeFirstLetter(userInfo?.personType?.description)
	return userInfo
};

userService.login = (credentials) => api.post("/login", credentials);

userService.logout = () => api.post("/logout", {});

export default userService;