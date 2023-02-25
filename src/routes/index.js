import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../modules/Home";
import UserList from "../modules/UserList";
import CompanyList from "../modules/CompanyList";
import Main from "../layout/Main";
import SignIn from "../modules/SignIn";
import AvailableProducts from "../modules/UserProductList";
import Movements from "../modules/Movements";
import Extract from "../modules/Extract";
import PrivateRoute from "./PrivateRoute";
import { NoMatch } from "../modules/NoMatch";

function Router() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/sign-in" exact element={<SignIn />} />
      </Routes> */}

      <Main>
        {/* <Routes>
          <Route exact path="/personasfisicas" element={<UserList />} /> 
          <Route exact path="/personasjuridicas" element={<CompanyList />} />
          <Route exact path="/product/available/:id" element={<AvailableProducts />} />
          <Route exact path="/movement/:id" element={<Movements />} />
          <Route exact path="/extract/:userid/:id" element={<Extract />} />
        </Routes> */}

        <Routes>

        <Route path="/sign-in" exact element={<SignIn />} />
          
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>

          <Route exact path="/home" element={<PrivateRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route>

          <Route exact path="/extract/:userid/:id" element={<PrivateRoute />}>
            <Route exact path="/extract/:userid/:id" element={<Extract />} />
          </Route>

          <Route exact path="/movement/:id" element={<PrivateRoute />}>
            <Route exact path="/movement/:id" element={<Movements />} />
          </Route>

          <Route exact path="/product/available/:id" element={<PrivateRoute />}>
            <Route exact path="/product/available/:id" element={<AvailableProducts />}/>
          </Route>

          <Route exact path="/personasfisicas" element={<PrivateRoute />}>
            <Route exact path="/personasfisicas" element={<UserList />} />
          </Route>

          <Route exact path="/personasjuridicas" element={<PrivateRoute />}>
            <Route exact path="/personasjuridicas" element={<CompanyList />} />
          </Route>

          <Route path="*" element={<NoMatch></NoMatch>}></Route>

        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default Router;
