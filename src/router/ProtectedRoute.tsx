import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { authToken, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Verifying authentication...
      </div>
    );
  }
  return authToken ? <Outlet /> : <Navigate to={"/auth"} />;
}
