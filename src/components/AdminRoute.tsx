import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/auth/authSelectors";

export const AdminRoute = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser || currentUser.userType === "employee") {
    return <Navigate to="/upcoming" />;
  }

  return children;
};