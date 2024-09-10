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
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Database, Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/auth";
import { Box } from "@components/ui/box";
import { Button } from "@components/ui/button";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TConnectFunc, TConnectParam } from "@/context/auth/types";
import { useState } from "react";
import HttpError from "@/httpClient/HttpError";

interface IConnectToDBForm {
  dbuser: string;
  host: string;
  port: number;
  dbpassword: string;
  database: string;
}

const useConnect = (callbackFunc: TConnectFunc) => {
  const mutation = useMutation({
    mutationFn: (data: Partial<IConnectToDBForm>) => {
      console.log(data);
      return callbackFunc(data as TConnectParam);
    },
  });

  return mutation;
};

export const AddNewConnectionModal = () => {
  const { toast } = useToast();
  const { connect } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending } = useConnect(connect);
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
    console.log("form submitted with values", values);

    try {
      await mutateAsync(values);
      toast({
        title: "Connected with Postgres Database",
        variant: "success",
      });

      setIsOpen(false);
    } catch (e) {
      console.error(e);

      if (e instanceof HttpError) {
        toast({
          title: "Unable to connect with Postgres Database",
          description: e.message,
          variant: "destructive",
        });
      } else if (e instanceof Error) {
        toast({
          title: "Unable to connect with Postgres Database",
          description: e.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unable to connect with Postgres Database",
          description: "Unknown error",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Box role="button" data-testid="add-db-btn">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Box className="flex">
                  <Plus size={8} strokeWidth={"2.5px"} />
                  <Database size={16} color={"rgb(107 114 128)"} />
                </Box>
              </TooltipTrigger>
              <TooltipContent>Add New Database</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Box>
        {/* {isPending ? <LoadingSpinner size={16} /> : null}
            {isConnected ? (
              <Check size={12} color="rgb(74 222 128)" strokeWidth={"5px"} />
            ) : (
              <X size={12} color="rgb(248 113 113)" strokeWidth={"5px"} />
            )} */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Postgres</DialogTitle>
          <DialogDescription>Provide Credentials to Login</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            data-testid="add-new-connection-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
                    <Input type="password" placeholder="Password" {...field} />
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
            <Button
              type="submit"
              data-testid="connect-db-btn"
              disabled={isPending}
            >
              {isPending ? (
                <Box data-testid="loading-spinner">
                  <LoadingSpinner />{" "}
                </Box>
              ) : (
                "Connect"
              )}
            </Button>
            {isPending}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
