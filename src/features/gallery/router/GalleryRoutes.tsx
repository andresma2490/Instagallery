import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute";
import GalleryPage from "../pages/GalleryPage";

export default function GalleryRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<GalleryPage />} />;
      </Route>
    </Routes>
  );
}
