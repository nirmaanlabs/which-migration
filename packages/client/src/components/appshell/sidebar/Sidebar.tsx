import { Box } from "@/components/ui/box";
import { ServerTree } from "@components/objecttree/Servertree";
import { Allotment } from "allotment";
import { Pane } from "../pane/Pane";
import { Document } from "../types";
import { AddProjectButton } from "@/features/project/action/AddProjectButton";

export type SidebarProps = {
  title: string;
  documents: Document[];
  openEditors: Document[];
  onOpenEditorsChange: (documents: Document[]) => void;
};

export const Sidebar = () => {
  return (
    <Box className="h-full flex flex-col">
      <Box className="flex overflow-hidden box-border px-2 h-9">
        <Box className="pt-2">
          <h2 className="text-xs">OBJECT EXPLORER</h2>
        </Box>
        <Box className="flex-1">
          <Box className="flex items-center h-full w-full justify-end p-0 mx-0 my-auto">
            <a className="codicon codicon-ellipsis"></a>
          </Box>
        </Box>
      </Box>
      <Box className="flex-1 text-sm">
        <Allotment vertical>
          <Allotment.Pane
            key="openProject"
            // maxSize={22 + 22 * 22}
            minSize={22 + 22 * 22}
          >
            <Pane title="Project" actions={<AddProjectButton />}>
              <ServerTree />
            </Pane>
          </Allotment.Pane>
          {/* <Allotment.Pane
            key="openEditors"
            maxSize={22 + 22 * 22}
            minSize={22 + 22 * 22}
          >
            <Pane title="Open Editors">
              <ServerTree />
            </Pane>
          </Allotment.Pane> */}
        </Allotment>
      </Box>
    </Box>
  );
};
