import lscache from "lscache";

// enable warnings
if (process.env.REACT_APP_ENV !== "production") {
	lscache.enableWarnings(true);
}

const tokenKey = process.env.REACT_APP_TOKEN_KEY;
const duration = process.env.REACT_APP_DURATION; // 24hs in milliseconds
const localStorage = {};

// Set token
localStorage.set = (user) => lscache.set(tokenKey, user, duration);

// Get token
localStorage.get = () => lscache.get(tokenKey);

// Delete token
localStorage.delete = () => lscache.flush();

// Get user
localStorage.getUser = () => lscache.get(tokenKey)?.user;

// Update user
localStorage.updateUser = (updatedUser) => {
	const storageData = lscache.get(tokenKey);
	storageData.user = updatedUser;
	localStorage.set(storageData);
};

export default localStorage;