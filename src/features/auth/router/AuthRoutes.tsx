import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="" element={<Navigate to={"login"} />} />
      <Route path="login" element={<LoginPage />} />;
    </Routes>
  );
}
