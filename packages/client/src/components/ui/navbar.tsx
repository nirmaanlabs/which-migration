import { Database } from "lucide-react";
import { Box } from "./box";
import { Toggle } from "./toggle";

const NavbarContainer = Box;

export const Navbar = () => {
  return (
    <NavbarContainer className="flex flex-column h-full p-1">
      <Toggle className="data-[state=on]:border-l-4 data-[state=on]:border-indigo-500">
        <Database size={24} />
      </Toggle>
    </NavbarContainer>
  );
};
