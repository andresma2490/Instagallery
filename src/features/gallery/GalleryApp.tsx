import { Outlet } from "react-router-dom";
import GalleryRoutes from "./router/GalleryRoutes";

export default function GalleryApp() {
  return (
    <>
      <Outlet />
      <GalleryRoutes />
    </>
  );
}
