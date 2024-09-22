import { Box } from "@/components/ui/box";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { AddNewProjectDrawer } from "../AddNewProjectDrawer";

export const AddProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        role="button"
        data-testid="add-project-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Box className="flex">
                <SquarePlus size={16} strokeWidth={"2.5px"} />
              </Box>
            </TooltipTrigger>
            <TooltipContent>Add Project</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Box>
      <AddNewProjectDrawer open={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </>
  );
};
