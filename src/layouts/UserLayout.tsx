import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import {
  api,
  clearAxiosInterceptor,
  setupAxiosInterceptors,
} from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

export default function UserLayout() {
  const { tokenRef } = useAuth();
  useEffect(() => {
    (api.interceptors.request as unknown as { _ids?: number[] })._ids?.forEach(
      (id: number) => api.interceptors.request.eject(id),
    );
    setupAxiosInterceptors(() => tokenRef);
    return () => clearAxiosInterceptor();
  }, [tokenRef]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
