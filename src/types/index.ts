
export type WebflowAuthenticatedUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type WebflowSite = {
  id: string;
  workspaceId: string;
  displayName: string;
  shortName: string;
  previewUrl: string;
};

export type WebflowCustomScript = {
  id: string;
  displayName: string;
  hostedLocation: string;
  integrityHash: string;
  canCopy: boolean;
  version: string;
};

