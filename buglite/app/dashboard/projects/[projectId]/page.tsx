"use client";
import HeaderComponent from "@/components/header/Header";
import Placeholder from "@/components/Placeholder/Placeholder";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { LOGBOOK_FORM } from "@/types/data_types";
import { Brain, Contact, Feather, Search, SearchX } from "lucide-react";
import { use } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/loader/Loader";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const ProjectInformation = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const unwrapped = use(params);
  const { projectId } = unwrapped;
  const [searching, setSearching] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const searchForCollaborator = async () => {
    try {
      setSearching(true);
      if (!email) {
        toast.error("Valid email address required");
        return;
      }
      const response = await axios.post("/api/contributors/search", {
        searchEmail: email,
      });

      if (response.data.success) {
        console.log(response.data.response);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Search process failed");
    } finally {
      setSearching(false);
    }
  };

  const logbookForm = useForm<LOGBOOK_FORM>({
    defaultValues: {
      project_id: projectId,
      title: "",
      description: "",
      category: "",
      state: "pending",
    },
  });

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <HeaderComponent />
      <div className="w-full flex flex-col justify-start items-start mt-[90px] p-4">
        <div className="w-full flex justify-center items-center gap-2 mb-4">
          <ButtonGroup>
            <ButtonGroup>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline">
                    New Activity Record
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Add New Activity</DialogTitle>
                  <Separator />
                  <Form {...logbookForm}>
                    <form>
                      {/* project id */}
                      <FormField
                        name="project_id"
                        control={logbookForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Project ID</FormLabel>
                              <FormControl>
                                <Input {...field} value={projectId} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/* record category */}
                      <FormField
                        name="category"
                        control={logbookForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem className=" my-3">
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Select {...field}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Categories</SelectLabel>
                                      <SelectItem value="issue">
                                        Report Issue
                                      </SelectItem>
                                      <SelectItem value="bug">
                                        Report Bug
                                      </SelectItem>
                                      <SelectItem value="testing">
                                        Testing Issue
                                      </SelectItem>
                                      <SelectItem value="feature-request">
                                        Feature Request
                                      </SelectItem>
                                      <SelectItem value="refactor">
                                        Code Refactor
                                      </SelectItem>
                                      <SelectItem value="performance">
                                        Performance Issue
                                      </SelectItem>
                                      <SelectItem value="security">
                                        Security Concern
                                      </SelectItem>
                                      <SelectItem value="dependency">
                                        Dependency Update
                                      </SelectItem>
                                      <SelectItem value="architecture">
                                        Architecture Change
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/* record title */}
                      <FormField
                        name="title"
                        control={logbookForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Record Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter title for the record"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {/* record description */}
                      <FormField
                        name="description"
                        control={logbookForm.control}
                        render={({ field }) => {
                          return (
                            <FormItem className="my-3">
                              <FormLabel>Record Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Add a description for your concern"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <DialogFooter className="mt-5">
                        <Button>Create Record</Button>
                        <DialogClose asChild>
                          <Button>Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline">
                    Add Collaborator
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Add Collaborator</DialogTitle>
                  <Separator />
                  <div className="w-full flex gap-2 justify-center items-center mt-1">
                    <Input
                      className="w-full"
                      placeholder="Search user by email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={() => searchForCollaborator()}>
                      <Search /> Search
                    </Button>
                  </div>
                  <div className="w-full h-[350px] border rounded-lg">
                    {searching ? (
                      <Loader
                        params={{
                          support_text: "Searching for contributor",
                          full_h: true,
                        }}
                      />
                    ) : (
                      <Placeholder
                        params={{
                          title: "No Results!",
                          description:
                            "The contributor you tried to find is not existing any more! Try a different email!",
                          Icon: SearchX,
                        }}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </ButtonGroup>
          </ButtonGroup>
        </div>
        <div className="w-full max-w-[1000px] m-auto grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* main stripe for activity log */}
          <div className="p-2 flex flex-col justify-center items-start border rounded-lg md:row-span-2 h-[700px] md:h-auto">
            <h1 className="text-xl font-semibold ml-4">Activity Log</h1>
            <Separator className="my-2" />
            <Placeholder
              params={{
                title: "No Activities Yet!",
                description:
                  "Be the first one to create a new activity for this project! Activity log is currently empty.",
                Icon: Feather,
              }}
            />
          </div>
          {/* project collaborators/contributors */}
          <div className="p-2 flex flex-col justify-center items-start w-full border rounded-lg h-[350px] md:col-start-2 max-w-[450px]">
            <h1 className="text-xl font-semibold ml-4">Collaborators</h1>
            <Separator className="my-2" />
            <Placeholder
              params={{
                title: "No Collaborators!",
                description:
                  "This project currently does not have any collaborators. Try to add some and get start the working!",
                Icon: Contact,
              }}
            />
          </div>
          {/* project insights and infomation */}
          <div className="p-2 flex flex-col justify-center items-start w-full border rounded-lg h-[350px] md:col-start-2 max-w-[450px]">
            <h1 className="text-xl font-semibold ml-4">Project Insights</h1>
            <Separator className="my-2" />
            <Placeholder
              params={{
                title: "No Insights Yet!",
                description:
                  "This project is not yet have enough activity log records to display the project insights. This section will be available once you work with the project.",
                Icon: Brain,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
