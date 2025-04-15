import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectCurrentUser, selectIsLoading } from "../redux/auth/authSelectors";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!token && !isLoading) {
      navigate('/login');
    }
  }, [token, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token || !user) {
    return null;
  }

  return children;
};
