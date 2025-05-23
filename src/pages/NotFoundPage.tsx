import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
      <Link to={"/"} className="text-blue-500 underline underline-offset-2">
        Go back home
      </Link>
    </div>
  );
}
