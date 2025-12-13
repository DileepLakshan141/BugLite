export type PROJECT = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};

export type LOGBOOK_FORM = {
  project_id: string;
  category: string;
  title: string;
  description: string;
  state: string;
};

export type COLLABORATOR_INVITE = {
  id: string;
  name: string;
  email: string;
  image: string;
  projectId: string;
};
