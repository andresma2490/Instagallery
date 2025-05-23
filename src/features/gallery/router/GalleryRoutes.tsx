import { Route, Routes } from "react-router-dom";
import GalleryPage from "../pages/GalleryPage";

export default function GalleryRoutes() {
  return (
    <Routes>
      <Route index element={<GalleryPage />} />;
    </Routes>
  );
}
