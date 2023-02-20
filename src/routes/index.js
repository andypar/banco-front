import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserList from "../modules/UserList";
import CompanyList from "../modules/CompanyList";
import Main from "../layout/Main";
import SignIn from "../modules/SignIn";
import AvailableProducts from "../modules/UserProductList";
import Movements from "../modules/Movements";
import Extract from "../modules/Extract";
import PrivateRoute from "./PrivateRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" exact element={<SignIn />} />
      </Routes>
      <Main>
        {/* <Routes>
          <Route exact path="/personasfisicas" element={<UserList />} /> 
          <Route exact path="/personasjuridicas" element={<CompanyList />} />
          <Route exact path="/product/available/:id" element={<AvailableProducts />} />
          <Route exact path="/movement/:id" element={<Movements />} />
          <Route exact path="/extract/:userid/:id" element={<Extract />} />
        </Routes> */}

        <Routes>
          <Route exact path="/extract/:userid/:id" element={<PrivateRoute />}>
            <Route exact path="/extract/:userid/:id" element={<Extract />} />
          </Route>
        </Routes>

        <Routes>
          <Route exact path="/movement/:id" element={<PrivateRoute />}>
            <Route exact path="/movement/:id" element={<Movements />} />
          </Route>
        </Routes>

        <Routes>
          <Route exact path="/product/available/:id" element={<PrivateRoute />}>
            <Route exact path="/product/available/:id" element={<AvailableProducts />} />
          </Route>
        </Routes>

        <Routes>
          <Route exact path="/personasfisicas" element={<PrivateRoute />}>
            <Route exact path="/personasfisicas" element={<UserList />} />
          </Route>
        </Routes>

        <Routes>
          <Route exact path="/personasjuridicas" element={<PrivateRoute />}>
            <Route exact path="/personasjuridicas" element={<CompanyList />} />
          </Route>
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default Router;
