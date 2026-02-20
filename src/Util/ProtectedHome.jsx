import { useContext } from "react";
import { Authcontext } from "../context/Authcontext";
import { Home } from "../admin_pages/home";
import { UserHome } from "../user_pages/UserHome";

export default function ProtectedHome() {
  const { user } = useContext(Authcontext);

  // guest bhi homepage dekh sakta
  if (!user) return <UserHome />;

  return user.role === "admin"
    ? <Home />
    : <UserHome />;
}