import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from '@microsoft/sp-http';
import { IMyListItem } from "../models/IMyListItem";
import FieldNames from '../data/FieldNames';
import { sp } from "@pnp/sp";
import "@pnp/sp/presets/all";


export default class ListService {

    private webPartContext: WebPartContext;
    private currentWebAbsUrl: string;
    private currentRelUrl: string;
    constructor(webPartContext: WebPartContext) {
        this.webPartContext = webPartContext;
        this.currentRelUrl = this.webPartContext.pageContext.web.serverRelativeUrl;
        this.currentWebAbsUrl = this.webPartContext.pageContext.web.absoluteUrl;
    }


    public getListIdByRelUrl = async (listUrl: string): Promise<string> => {
        let listId: string = '';
        const listResponse = await this.webPartContext.spHttpClient.get(
            this.currentWebAbsUrl + "/_api/web/getlist('" + this.currentRelUrl + "/" + listUrl + "')?$select=Id",
            SPHttpClient.configurations.v1
        );
        const listResponseJSON = await listResponse.json();
        listId = listResponseJSON['Id'];
        return listId;
    };

    public getListDataById = async (listId: string): Promise<IMyListItem[]> => {
        const myListItems: IMyListItem[] = new Array<IMyListItem>();

        const listDataResponse = await this.webPartContext.spHttpClient.get(
            this.currentWebAbsUrl + "/_api/web/lists/getbyid(guid'" + listId + "')/items",
            SPHttpClient.configurations.v1
        );

        const listDataResponseJSON = await listDataResponse.json();

        for (let index = 0; index < listDataResponseJSON.value.length; index++) {
            const element = listDataResponseJSON.value[index];
            myListItems.push(
                {
                    BooleanField: element[FieldNames.BooleanField],
                    ChoiceField: element[FieldNames.ChoiceField],
                    DateField: new Date(element[FieldNames.DateField]),
                    Id: element[FieldNames.Id],
                    Number1: element[FieldNames.Number1],
                    Title: element[FieldNames.Title]
                }
            );
        }
        return myListItems;
    }

    public getListDataByCamlQuery = async (listUrl: string, query: string, viewFields: string[]): Promise<any> => {

        // let viewFieldsXML = "<ViewFields>";
        // viewFields.forEach(
        //     (fieldname) => {
        //         viewFieldsXML += `<FieldRef Name=${fieldname} />`
        //     });
        // viewFieldsXML += "</ViewFields>";

        let viewXML = `<View>${query}</View>`;
        const getDataByCAMLQueryResponse = await sp.web.getList(this.currentRelUrl + "/" + listUrl).renderListDataAsStream(
            {
                ViewXml: viewXML
            }

        );
        let allItems = await sp.web.getList(this.currentRelUrl + "/" + listUrl).items.get();

        console.log(getDataByCAMLQueryResponse);

        return getDataByCAMLQueryResponse;

    }


}