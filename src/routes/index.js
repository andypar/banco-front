import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserList from "../modules/UserList";
import AppStatus from "../modules/AppStatus";
import Main from "../layout/Main";
import SignIn from "../modules/SignIn";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" exact element={<SignIn />} />
      </Routes>
      <Main>
        <Routes>
          <Route exact path="/" element={<AppStatus />} />
          <Route exact path="/user" element={<UserList />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default Router;
