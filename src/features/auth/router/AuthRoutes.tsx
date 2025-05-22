import { Navigate, Route, Routes } from "react-router-dom";
import PublicOnlyRoute from "@/router/PublicOnlyRoute";
import LoginPage from "../pages/LoginPage";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="" element={<Navigate to={"login"} />} />
        <Route path="login" element={<LoginPage />} />;
      </Route>
    </Routes>
  );
}
