import { WebPartContext } from "@microsoft/sp-webpart-base";
import ListService from "../../../services/ListService";

export interface IDemoSpfxProps {
  description: string;
  property1:string;
  wpContext:WebPartContext;
  listService:ListService;
}
