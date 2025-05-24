import { useAuth } from "@/contexts/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="cursor-pointer p-2 rounded hover:underline underline-offset-2"
    >
      Logout
    </button>
  );
}
