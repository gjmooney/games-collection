import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import NavAvatarMenu from "./NavAvatarMenu";
import FancyLink from "./animations/FancyLink";
import { Button } from "./ui/button";

const Navbar = ({}) => {
  return (
    <header
      id="navbar"
      className="sticky top-0 z-10 flex w-full items-center justify-between border-b-2 border-accent/20 bg-secondary p-4 font-medium transition-all duration-1000 ease-in-out md:px-32 mb-16"
    >
      <nav className="hidden h-full items-center justify-between md:flex">
        <FancyLink title="Home" href="/" className="mr-4" />
        <FancyLink title="Games" href="/games" className="mx-4" />
        <FancyLink title="Update" href="/update" className="ml-4" />
      </nav>

      <div className="flex gap-4">
        <SignedIn>
          <NavAvatarMenu />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button size={"navLink"}>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
