import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicOnlyRoute() {
  const { authToken } = useAuth();
  return authToken ? <Navigate to={"/user"} /> : <Outlet />;
}
