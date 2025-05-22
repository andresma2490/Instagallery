import { Outlet } from "react-router-dom";
import AuthRoutes from "./router/AuthRoutes";

export default function AuthApp() {
  return (
    <>
      <Outlet />
      <AuthRoutes />
    </>
  );
}
