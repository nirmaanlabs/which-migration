import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { useForm } from "react-hook-form";

interface IAddProjectForm {
  projectname: string;
  connections: [];
}

export const ProjectForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  const { dbInstances } = useAuthContext();
  const form = useForm<IAddProjectForm>({
    defaultValues: {
      projectname: "",
      connections: [],
    },
  });

  // 2. Define a submit handler.
  // async function onSubmit(values: Partial<IAddProjectForm>) {
  //   console.log("form submitted with values", values);

  //   try {
  //     // await mutateAsync(values);
  //     toast({
  //       title: "Connected with Postgres Database",
  //       variant: "success",
  //     });
  //   } catch (e) {
  //     console.error(e);

  //     if (e instanceof HttpError) {
  //       toast({
  //         title: "Unable to connect with Postgres Database",
  //         description: e.message,
  //         variant: "destructive",
  //       });
  //     } else if (e instanceof Error) {
  //       toast({
  //         title: "Unable to connect with Postgres Database",
  //         description: e.message,
  //         variant: "destructive",
  //       });
  //     } else {
  //       toast({
  //         title: "Unable to connect with Postgres Database",
  //         description: "Unknown error",
  //         variant: "destructive",
  //       });
  //     }
  //   }
  // }
  return (
    <Form {...form}>
      <form
        data-testid="add-new-connection-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="projectname"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Feature Name" {...field} />
              </FormControl>
              <FormDescription>
                All the migration script will be tagged with this project name.
                It is recommended you put the same name of your working git
                branch
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          rules={{ required: true }}
          name="connections"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Connection</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Existing Connection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(dbInstances).map((key) => (
                    <SelectItem key={key} value={key}>
                      {dbInstances[key]["db"]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                <Button type="button" variant="ghost">
                  + New Connection
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" data-testid="connect-db-btn" disabled={isLoading}>
          {isLoading ? (
            <Box data-testid="loading-spinner">
              <LoadingSpinner />{" "}
            </Box>
          ) : (
            "Add Project"
          )}
        </Button>
      </form>
    </Form>
  );
};
