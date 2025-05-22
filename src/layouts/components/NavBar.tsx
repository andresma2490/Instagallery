import LogoutButton from "./LogoutButton";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 sm:px-4">
      <div className="flex gap-4"></div>
      <h1 className="text-2xl font-bold">User Gallery</h1>
      <LogoutButton />
    </nav>
  );
}
