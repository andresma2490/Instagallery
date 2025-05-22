import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function UserLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
