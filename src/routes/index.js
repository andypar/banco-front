import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserList from "../modules/UserList";
// import AppStatus from "../modules/AppStatus";
import Main from "../layout/Main";
import SignIn from "../modules/SignIn";
import Register from "../modules/Register";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" exact element={<SignIn />} />
      </Routes>
      <Main>
        <Routes>
          <Route exact path="/personas" element={<UserList />} />
          <Route exact path="/registracion" element={<Register />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default Router;
