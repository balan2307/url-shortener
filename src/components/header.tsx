import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/db/api.auth";
import useFetch from "@/hooks/user-fetch";
import { UrlState } from "@/context/context";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { fn: logout ,loading } = useFetch(signOut);
  const { user ,fetchUser } = UrlState();

  console.log("USER ",user?.user_metadata)
  return (
  <>
    <nav className="flex justify-between w-full items-center">
      <Link to="/">
        <img src="/logo.png" className="h-16" alt="Trimmr logo"></img>
      </Link>

      <div>
        {!user ? (
          <Button
            className="cursor-pointer"
            onClick={() => navigate("/auth")}
          >Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-none">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.profile_pic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2">
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LinkIcon></LinkIcon>

                <span> My links</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={() => {
                  logout().then(() => {
                    navigate("/");
                    fetchUser()
                  });
                }}
              >
                <LogOut className="text-red-600"></LogOut>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
    {loading && <BarLoader width={"100%"} color="white" />}
  </>
  )
}

export default Header;
