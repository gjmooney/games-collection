import { UserButton } from "@clerk/nextjs";
import FancyLink from "./animations/FancyLink";

const Navbar = ({}) => {
  return (
    <header
      id="navbar"
      className="sticky top-0 z-10 flex w-full items-center justify-between border bg-secondary p-8 font-medium transition-all duration-1000 ease-in-out md:px-32 mb-16"
    >
      <nav className="hidden h-full items-center justify-between md:flex">
        <FancyLink title="Home" href="/" className="mr-4" />
        <FancyLink title="Games" href="/games" className="mx-4" />
        <FancyLink title="Update" href="/update" className="ml-4" />
      </nav>

      <UserButton />
      {/* <ModeToggle /> */}
    </header>
  );
};

export default Navbar;
