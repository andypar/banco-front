import "../styles/App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserList from "../modules/UserList";
import AppStatus from "../modules/AppStatus";
import Main from "../components/layout/Main";


function Router() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <AppStatus />,
//     },
//     {
//       path: "/user",
//       element: <UserList />,
//     },
//   ]);

  return (
	<BrowserRouter>
    <Main>
		<Routes>
			<Route exact path="/" element={<AppStatus/>} />
			<Route exact path="/user" element={<UserList/>} />
      {/* <RouterProvider router={router} /> */}
	  </Routes>
    </Main>
	</BrowserRouter>
  );
}

export default Router;
