import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import UserLayout from "../layouts/UserLayout";

const AuthApp = lazy(() => import("@/features/auth/AuthApp"));
const GalleryApp = lazy(() => import("@/features/gallery/GalleryApp"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth"} />} />
      <Route element={<PublicOnlyRoute />}>
        <Route path="/auth/*" element={<AuthApp />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to={"gallery"} />} />
          <Route path="gallery/*" element={<GalleryApp />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
