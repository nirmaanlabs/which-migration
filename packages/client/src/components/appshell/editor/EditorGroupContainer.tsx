import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Columns2, Play, X } from "lucide-react";
import { ReactNode } from "react";

export type EditorGroupContainerProps = {
  document?: { title: string; icon: string };
  onClose?: () => void;
  onSplitEditor?: () => void;
  children: ReactNode;
};

const ActionContainer = Box;
const FileTabContainer = Box;
const FileName = Box;
const FileTabAction = Box;

export const EditorGroupContainer = ({
  children,
}: EditorGroupContainerProps) => {
  return (
    <Box className="h-full">
      <Box className="mb-2">
        <FileTabContainer className="file-tab-container flex justify-between px-2 py-1">
          <FileName className="flex items-center gap-1 ">
            <Box className="">
              <p className="text-sm">{"tag_name.sql"}</p>
            </Box>
            <X size={12}></X>
          </FileName>
          <FileTabAction className="">
            <Columns2 size={12}></Columns2>
          </FileTabAction>
        </FileTabContainer>
        <ActionContainer className="shadow-md dark:shadow-gray-800 action-container p-1">
          <Box className="flex items-center gap-2">
            <Button variant="ghost" className="px-2 py-2">
              <Play size={12} color="green" />
              <p className="text-xs white font-normal">&nbsp; Run</p>
            </Button>
            <Box className="">
              <Input defaultValue={"SOME_DATABASE"} className="h-6" />
            </Box>
          </Box>
        </ActionContainer>
      </Box>
      <Box className="">{children}</Box>
    </Box>
  );
};
