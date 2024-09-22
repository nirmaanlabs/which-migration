import { SqlEditor } from "@/components/editor/SqlEditor";
import { Box } from "@/components/ui/box";
import { Allotment } from "allotment";
import { Document } from "../types";
import { EditorGroupContainer } from "./EditorGroupContainer";

export type EditorProps = {
  documents: Document[];
  onDocumentsChange: (documents: Document[]) => void;
};

export const Editor = () => {
  return (
    <Box className="h-full w-full overflow-hidden">
      <Allotment minSize={110}>
        <EditorGroupContainer>
          <SqlEditor />
        </EditorGroupContainer>
      </Allotment>
    </Box>
  );
};
