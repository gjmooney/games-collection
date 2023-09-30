import { SignOutButton, currentUser } from "@clerk/nextjs";
import { Cookie, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavAvatarMenuProps {}

const NavAvatarMenu = async ({}: NavAvatarMenuProps) => {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="sr-only">menu</div>
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="profile avatar" />
          <AvatarFallback className="capitalize">
            {user?.username?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/manage-cookies">
              <Cookie className="mr-2 h-4 w-4" />
              Manage Cookies
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <SignOutButton>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Link>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavAvatarMenu;
