import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IVersionCommentDemoProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  wpContext:WebPartContext;
}
