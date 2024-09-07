import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Database, Check, X } from "lucide-react";

import { useForm } from "react-hook-form";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth";
import { LoadingSpinner } from "../ui/LoadingSpinner";
const NavbarContainer = Box;

interface IConnectToDBForm {
  dbuser: string;
  host: string;
  port: number;
  dbpassword: string;
  database: string;
}

const useConnect = (callbackFunc) => {
  const mutation = useMutation({
    mutationFn: (data: Partial<IConnectToDBForm>) => {
      console.log(data);
      return callbackFunc(data);
    },
  });

  return mutation;
};

export const Navbar = () => {
  const { toast } = useToast();
  const { connect, isConnected } = useAuth();

  const { mutate, isPending } = useConnect(connect);
  const form = useForm<IConnectToDBForm>({
    defaultValues: {
      dbuser: "",
      dbpassword: "",
      host: "",
      port: 5432,
      database: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: Partial<IConnectToDBForm>) {
    mutate(values, {
      onSuccess: () => {
        toast({
          title: "Connected with Postgres Database",
        });
      },
      onError: (error) => {
        toast({
          title: "Unable to connect with Postgres Database",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <NavbarContainer className="flex flex-column h-full p-1">
      <Dialog>
        <DialogTrigger asChild>
          <Toggle className="data-[state=on]:border-l-4 data-[state=on]:border-indigo-500">
            <Box className="flex">
              {isPending ? <LoadingSpinner size={16} /> : null}
              {isConnected ? (
                <Check size={12} color="rgb(74 222 128)" strokeWidth={"5px"} />
              ) : (
                <X size={12} color="rgb(248 113 113)" strokeWidth={"5px"} />
              )}

              <Database
                size={24}
                color={isConnected ? "black" : "rgb(107 114 128)"}
              />
            </Box>
          </Toggle>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Postgres</DialogTitle>
            <DialogDescription>Provide Credentials to Login</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="dbuser"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dbpassword"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{ required: true }}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Host" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Port" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="database"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Database" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Connect</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </NavbarContainer>
  );
};
