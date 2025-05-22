import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { setupAxiosInterceptors } from "./lib/axios";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./router/AppRoutes";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
