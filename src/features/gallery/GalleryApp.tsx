import { Outlet } from "react-router-dom";
import GalleryRoutes from "./router/GalleryRoutes";
import { GalleryProvider } from "./contexts/GalleryContext";

export default function GalleryApp() {
  return (
    <GalleryProvider>
      <Outlet />
      <GalleryRoutes />
    </GalleryProvider>
  );
}
