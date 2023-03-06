import Router from "./routes/index";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { UserContext } from "./context/UserContext";
import { useMemo } from "react";
import localStorage from "./services/localStorage";

function App() {

  const role = localStorage.get()?.user?.role;
 
  const roleProvider = useMemo(() => ({ role }), [role]);

  return (
    <UserContext.Provider value={roleProvider}>
      <Router />
    </UserContext.Provider>
  );
}

export default App;
