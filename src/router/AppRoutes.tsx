import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AuthApp from "@/features/auth/AuthApp";
import GalleryApp from "@/features/gallery/GalleryApp";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth"} />} />
      <Route path="/auth/*" element={<AuthApp />} />

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Navigate to={"gallery"} />} />
        <Route path="gallery/*" element={<GalleryApp />} />
      </Route>

      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}
