import api from "./api";

const userService = {};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
  }

userService.getUsers = () => api.get(`/user/`);
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

// userService.createGlarriera2Token = () =>
// 	api.post("/login", {
// 		username: "andypar29",
// 		password: "Perritos123!",
// 	});

userService.login = () =>
api.post("/login", {});

export default userService;