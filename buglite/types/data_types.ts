export type PROJECT = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};

export type PROJECT_ENHANCED = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  user: COLLABORATOR_DETAILS;
};

export type CONTRIBUTION = {
  contributor_id: string;
  id: string;
  project_id: string;
  request_accepted: boolean;
  state: boolean;
  project: PROJECT;
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

export type COLLABORATOR = {
  id: string;
  contributor_id: string;
  project_id: string;
  state: boolean;
  request_accepted: boolean;
  user: COLLABORATOR_DETAILS;
};

export type COLLABORATOR_DETAILS = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
};

export type LOGBOOK_RECORD = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  category: string;
  state: string;
  user: COLLABORATOR_DETAILS;
  project: {
    id: string;
    author: string;
    name: string;
  };
};

export type LOGBOOK_SUMMARY = {
  issuesCount: number;
  testingCount: number;
  bugCount: number;
  securityCount: number;
  featureRequestCount: number;
  refactorCount: number;
  performanceCount: number;
  architectureCount: number;
  pendingIssues: number;
  closedIssues: number;
};

export type INVITATION = {
  id: string;
  project: PROJECT_ENHANCED;
  request_accepted: boolean;
  state: boolean;
  createdAt: Date;
  user: COLLABORATOR_DETAILS;
};
