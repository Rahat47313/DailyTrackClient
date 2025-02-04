import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/auth/authSelectors";

interface AdminRouteInterface {
  children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteInterface) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser || currentUser.userType === "employee") {
    return <Navigate to="/upcoming" />;
  }

  return children;
};