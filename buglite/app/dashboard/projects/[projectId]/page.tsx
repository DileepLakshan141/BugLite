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
import {
  COLLABORATOR,
  COLLABORATOR_INVITE,
  LOGBOOK_RECORD,
  LOGBOOK_SUMMARY,
} from "@/types/data_types";
import {
  Brain,
  BrushCleaning,
  Bug,
  CheckCheck,
  Contact,
  DiamondPlus,
  Feather,
  FolderCode,
  Gauge,
  LayoutGrid,
  Search,
  SearchX,
  ShieldAlert,
  TestTubeDiagonal,
  TriangleAlert,
} from "lucide-react";
import { use, useEffect } from "react";
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
import { z } from "zod";
import { logbook_schema } from "@/schemas/logbook";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUserStore from "@/utils/zustand/store";
import Loader from "@/components/loader/Loader";
import CollaboratorInvite from "@/components/invite/CollaboratorInvite";
import ContributorCard from "@/components/contributor/ContributorCard";
import { zodResolver } from "@hookform/resolvers/zod";
import LogRecord from "@/components/log_record/LogRecord";
import { Badge } from "@/components/ui/badge";

const ProjectInformation = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const unwrapped = use(params);
  const { projectId } = unwrapped;
  const [searching, setSearching] = useState<boolean>(false);
  const [LogbookRecrods, setLogBookRecords] = useState<LOGBOOK_RECORD[]>([]);
  const [fetchingRecords, setFetchingRecords] = useState<boolean>(false);
  const [fetchingContributors, setFetchingContributors] =
    useState<boolean>(false);
  const [recordCreating, setRecordCreating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [logbookSummary, setLogbookSummary] = useState<LOGBOOK_SUMMARY | null>(
    null
  );
  const [collaborators, setCollaborators] = useState<COLLABORATOR[]>([]);
  const [targetUser, setTargetUser] = useState<COLLABORATOR_INVITE | null>(
    null
  );

  const { getUser } = useUserStore();
  const curr_user = getUser();

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
        setTargetUser(response.data.response);
      } else {
        toast.error(response.data.message);
        setTargetUser(null);
      }
    } catch (error) {
      const wrapped = error as AxiosError<{ message: string }>;
      console.log(error);
      setTargetUser(null);
      toast.error(wrapped?.response?.data.message);
    } finally {
      setSearching(false);
    }
  };

  const insightsCalculator = (data: LOGBOOK_RECORD[]) => {
    let testingCount = 0;
    let issuesCount = 0;
    let bugCount = 0;
    let securityCount = 0;
    let featureRequestCount = 0;
    let refactorCount = 0;
    let performanceCount = 0;
    let architectureCount = 0;
    let pendingIssues = 0;
    let closedIssues = 0;

    data.forEach((item) => {
      if (item.state === "pending") {
        pendingIssues++;
      } else {
        closedIssues++;
      }
      switch (item.category) {
        case "testing":
          testingCount++;
          break;
        case "issue":
          issuesCount++;
          break;
        case "bug":
          bugCount++;
          break;
        case "feature-request":
          featureRequestCount++;
          break;
        case "refactor":
          refactorCount++;
          break;
        case "security":
          securityCount++;
          break;
        case "performance":
          performanceCount++;
          break;
        case "architecture":
          architectureCount++;
          break;
      }
    });
    console.log({
      issuesCount,
      testingCount,
      bugCount,
      securityCount,
      featureRequestCount,
      refactorCount,
      performanceCount,
      architectureCount,
      pendingIssues,
      closedIssues,
    });
    return {
      issuesCount,
      testingCount,
      bugCount,
      securityCount,
      featureRequestCount,
      refactorCount,
      performanceCount,
      architectureCount,
      pendingIssues,
      closedIssues,
    };
  };

  const getLogbookRecords = async () => {
    try {
      setFetchingRecords(true);
      const response = await axios.get(`/api/projects/logbook/${projectId}`);
      if (response.data.success) {
        setLogBookRecords(response.data.logbook_records);
        setLogbookSummary(insightsCalculator(response.data.logbook_records));
      } else {
        setLogBookRecords([]);
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(
        wrapper.response?.data.message || "Error while insights analyzing"
      );
      setLogBookRecords([]);
    } finally {
      setFetchingRecords(false);
    }
  };

  const logbookForm = useForm<z.infer<typeof logbook_schema>>({
    resolver: zodResolver(logbook_schema),
    defaultValues: {
      project_id: projectId,
      user_id: curr_user?.id,
      title: "",
      description: "",
      category: "issue",
      state: "pending",
    },
  });

  const dispachMessage = async (
    user: string,
    projectName: string,
    issueName: string,
    userName: string,
    issue_type: boolean
  ) => {
    const message_details = constructMessage(
      projectName,
      issueName,
      userName,
      issue_type
    );
    try {
      const response = await axios.post("/api/notifications", {
        title: message_details.title,
        message: message_details.message,
        issue_type,
        userId: user,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(wrapper.response?.data.message);
    }
  };

  const constructMessage = (
    projectName: string,
    issueName: string,
    userName: string,
    issue_type: boolean
  ) => {
    const title = `Issue opened on ${projectName}`;
    const message = `The issue named "${issueName}" has been ${
      issue_type ? "closed" : "opened"
    } by ${userName}. You can check the log records for more details of issue.`;
    return { title, message };
  };

  const userName = curr_user?.username || "sample";

  const createLogbookRecord = async (
    values: z.infer<typeof logbook_schema>
  ) => {
    try {
      setRecordCreating(true);
      const { project_id, user_id, title, description, category, state } =
        values;
      const validity_check = logbook_schema.safeParse(values);
      if (!validity_check.success) {
        return;
      }
      const response = await axios.post(`/api/projects/logbook/${projectId}`, {
        project_id,
        user_id,
        title,
        description,
        category,
        state,
      });

      if (response.data.success) {
        const record = response.data.new_record;
        console.log("record", record);

        toast.success(response.data.message);
        await dispachMessage(
          record.project.author,
          record.project.name,
          title,
          userName,
          false
        );
        logbookForm.reset();
        getLogbookRecords();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(wrapper.response?.data.message);
    } finally {
      setRecordCreating(false);
    }
  };

  const getCollaborators = async () => {
    try {
      setFetchingContributors(true);
      const response = await axios.get(
        `/api/projects/contributors/${projectId}`
      );
      console.log(response);

      if (response.data.success) {
        setCollaborators(response.data.contributors);
      } else {
        setCollaborators([]);
        toast.error(response.data.message);
      }
    } catch (error) {
      setCollaborators([]);
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(wrapper.response?.data.message);
    } finally {
      setFetchingContributors(false);
    }
  };

  useEffect(() => {
    getCollaborators();
    getLogbookRecords();
  }, [projectId]);

  return (
    <div className="w-full flex flex-col justify-start items-start">
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
                    <form
                      onSubmit={logbookForm.handleSubmit(createLogbookRecord)}
                    >
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
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
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
                        <Button type="submit">
                          {recordCreating ? "Creating..." : "Create Record"}
                        </Button>
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
                  <div className="w-full h-[350px] border rounded-lg p-3">
                    {targetUser != null ? (
                      <CollaboratorInvite
                        params={{ ...targetUser, projectId }}
                      />
                    ) : searching ? (
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
            {fetchingRecords ? (
              <Loader
                params={{
                  support_text:
                    "Project log records are fetching! Please Wait!",
                  full_h: true,
                }}
              />
            ) : LogbookRecrods.length < 1 ? (
              <Placeholder
                params={{
                  title: "No Activities Yet!",
                  description:
                    "Be the first one to create a new activity for this project! Activity log is currently empty.",
                  Icon: Feather,
                }}
              />
            ) : (
              <ScrollArea className="w-full h-full max-h-[650px] pr-5">
                {LogbookRecrods.map((item: LOGBOOK_RECORD) => {
                  return <LogRecord key={item.id} params={item} />;
                })}
              </ScrollArea>
            )}
          </div>
          {/* project collaborators/contributors */}
          <div className="p-2 flex flex-col justify-center items-start w-full border rounded-lg h-[350px] md:col-start-2 max-w-[450px]">
            <h1 className="text-xl font-semibold ml-4">Collaborators</h1>
            <Separator className="my-2" />
            {fetchingContributors ? (
              <Loader
                params={{
                  full_h: true,
                  support_text: "Fetching contributor details! Please wait!",
                }}
              />
            ) : !collaborators || collaborators?.length < 1 ? (
              <Placeholder
                params={{
                  title: "No Collaborators!",
                  description:
                    "This project currently does not have any collaborators. Try to add some and get start the working!",
                  Icon: Contact,
                }}
              />
            ) : (
              <ScrollArea className="w-full h-full">
                {collaborators.map((user) => {
                  return <ContributorCard key={user.id} params={user} />;
                })}
              </ScrollArea>
            )}
          </div>
          {/* project insights and infomation */}
          <div className="p-2 flex flex-col justify-center items-start w-full border rounded-lg h-[350px] md:col-start-2 max-w-[450px]">
            <h1 className="text-xl font-semibold ml-4">Project Insights</h1>
            <Separator className="my-2" />
            {fetchingRecords ? (
              <Loader
                params={{
                  support_text: "Please wait while we analyze logbook summary!",
                  full_h: true,
                }}
              />
            ) : logbookSummary == null ? (
              <Placeholder
                params={{
                  title: "No Insights Yet!",
                  description:
                    "This project is not yet have enough activity log records to display the project insights. This section will be available once you work with the project.",
                  Icon: Brain,
                }}
              />
            ) : (
              <ScrollArea className="w-full h-[290px] pr-5">
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <DiamondPlus className="text-red-500 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Pending Records
                    </p>
                  </div>
                  <Badge>{logbookSummary.pendingIssues}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <CheckCheck className="text-green-500 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Closed Records
                    </p>
                  </div>
                  <Badge>{logbookSummary.closedIssues}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <TriangleAlert className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Issue Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.issuesCount}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <Bug className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Bug Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.bugCount}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <ShieldAlert className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Security Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.securityCount}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <TestTubeDiagonal className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Testing Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.testingCount}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <LayoutGrid className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Feature Request Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.featureRequestCount}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <Gauge className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Performance Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.performanceCount}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <BrushCleaning className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Refactor Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.refactorCount}</Badge>
                </section>
                <Separator />
                <section className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-1">
                    <FolderCode className="text-gray-400 size-5" />
                    <p className="ml-2 text-muted-foreground font-semibold">
                      Architecture Records Count
                    </p>
                  </div>
                  <Badge>{logbookSummary.architectureCount}</Badge>
                </section>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
