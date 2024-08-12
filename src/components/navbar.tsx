import { Button } from "@nextui-org/button";

export default function Navbar() {
  return (
    <nav className="flex w-screen justify-between items-center px-3 py-2 shadow-md">
      <div>
        <h1 className="font-semibold">KARMA</h1>
      </div>
      <Button>SIGN IN</Button>
    </nav>
  );
}
