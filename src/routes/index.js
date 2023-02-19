import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserList from "../modules/UserList";
import Main from "../layout/Main";
import SignIn from "../modules/SignIn";
import Register from "../modules/Register";
import AvailableProducts from "../modules/UserProductList";
import Movements from "../modules/Movements";
import Extract from "../modules/Extract";

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
          <Route exact path="/movement/:id" element={<Movements />} />
          <Route exact path="/extract/:userid/:id" element={<Extract />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default Router;
