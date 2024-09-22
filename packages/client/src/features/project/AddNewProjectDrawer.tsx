import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ProjectForm } from "./AddProjectForm";
import { useMutation } from "@tanstack/react-query";

const createProject = async () => {
  try {
    Promise.resolve({
      id: 1,
      featureName: "xyz",
      projectName: "",
      fileName: "ramaba",
    });
  } catch {
    Promise.reject({ status: "error", msg: "Unable to create Project" });
  }
};

export const AddNewProjectDrawer = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => createProject(),
  });

  const onSubmit = () => {
    mutateAsync();
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onClose}
      direction="right"
      setBackgroundColorOnScale={false}
    >
      <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-1/3 rounded-none px-4 ">
        <DrawerHeader className="px-0">
          <DrawerTitle>Add a New Project</DrawerTitle>
          <DrawerDescription>Create Migrations like a Pro</DrawerDescription>
        </DrawerHeader>
        <ProjectForm onSubmit={onSubmit} isLoading={isPending} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
