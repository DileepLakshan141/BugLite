"use client";
import HeaderComponent from "@/components/header/Header";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { FolderGit2 } from "lucide-react";
import { FolderKanban } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useUserStore from "@/utils/zustand/store";
import { projectSchema } from "@/schemas/projects";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader/Loader";

const ProjectsScreenDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const { getUser } = useUserStore();
  const user = getUser();
  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      author: user?.id,
    },
  });

  const createProject = async (values: z.infer<typeof projectSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/projects", {
        name: values.name,
        description: values.description,
        author: values.author,
      });

      if (response.status == 201) {
        toast.success(response.data.message);
        projectForm.reset();
        projectForm.clearErrors();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Project creation failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserSpecificProjects = async () => {
      const userId = user?.id;
      try {
        setFetching(true);
        const response = await axios.get(`/api/projects/user/${userId}`);
        console.log(response);

        if (response.data?.success) {
          toast.success("User specific projects retrieved!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("user specific project fetching failed");
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    fetchUserSpecificProjects();
  }, [user?.id]);

  if (fetching) {
    return (
      <Loader
        params={{
          support_text: "Please wait while we look for your projects!",
        }}
      />
    );
  }

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <HeaderComponent />
      <div className="w-full flex flex-col justify-start items-start mt-[90px] p-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Projects</h1>
          {/* create project */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FolderKanban />
                Create New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Enter the details of you new project and finalize the form to
                  create a new project. Make sure to double check before submit.
                </DialogDescription>
              </DialogHeader>
              <Separator className="my" />
              <Form {...projectForm}>
                <form onSubmit={projectForm.handleSubmit(createProject)}>
                  {/* project name */}
                  <FormField
                    name="name"
                    control={projectForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your project name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  {/* project description */}
                  <FormField
                    name="description"
                    control={projectForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem className="mt-5">
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter project description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <DialogFooter className="mt-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Processing.." : "Create"}
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
              <Separator />
              <p className="text-sm text-center text-muted-foreground">
                You will be able to add contributors to the project once it
                created!
              </p>
            </DialogContent>
          </Dialog>
        </div>
        <Separator className="my-3" />
        {/* my projects container */}
        <div className="w-full flex justify-center items-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderGit2 />
              </EmptyMedia>
              <EmptyTitle>
                No recently created/contributed projects found!
              </EmptyTitle>
              <EmptyDescription>
                Looks like currently you have no created projects or contributed
                projects. This section will display the infomation related to
                your projects once they are created.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>
    </div>
  );
};

export default ProjectsScreenDashboard;
