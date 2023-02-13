import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserList from "../modules/UserList";
import Main from "../layout/Main";
import SignIn from "../modules/SignIn";
import Register from "../modules/Register";
import AvailableProducts from "../modules/UserProductList";

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
          <Route exact path="/product/available/:id" element={<AvailableProducts />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default Router;
