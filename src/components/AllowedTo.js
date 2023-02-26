import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function AllowedTo({ children }) {
    const { role } = useContext(UserContext);

    if (role !== "admin") {
      return <></>;
    } else {
      return children;
    }
  }

  export default AllowedTo;