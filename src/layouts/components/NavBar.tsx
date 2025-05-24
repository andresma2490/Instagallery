import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 sm:px-4">
      <Link to={"/404"}>
        <span className="text-gray-500 p-2">404</span>
      </Link>

      <h1 className="text-2xl font-bold">𝐼𝓃𝓈𝓉𝒶𝒢𝒶𝓁𝓁𝑒𝓇𝓎</h1>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
}
