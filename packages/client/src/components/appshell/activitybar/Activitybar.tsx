import { Box } from "@components/ui/box";
import { Toggle } from "@components/ui/toggle";
import { Files as ExplorerIcon } from "lucide-react";

interface IActivitybar {
  setPrimarySideBar: () => void;
}

export const Activitybar = (props: IActivitybar) => {
  return (
    <Box className="activity-bar h-full bg-slate-800 overflow-hidden">
      <Box
        onClick={props.setPrimarySideBar}
        className="activity-contents flex flex-col justify-between pt-1"
      >
        <Toggle className="data-[state=on]:border-l-4 data-[state=on]:border-indigo-500 transition-none hover:bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-accent rounded-none">
          <ExplorerIcon size={24} />
        </Toggle>
      </Box>
    </Box>
  );
};
