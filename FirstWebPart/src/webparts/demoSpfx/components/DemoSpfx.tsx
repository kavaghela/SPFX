import * as React from 'react';
import styles from './DemoSpfx.module.scss';
import { IDemoSpfxProps } from './IDemoSpfxProps';
import { cloneDeep, escape } from '@microsoft/sp-lodash-subset';
import { IDemoSpfxState } from './IDemoSpfxState';
import { IListInfo } from '../../../models/IListInfo';
import { SPHttpClient } from '@microsoft/sp-http';
import { Button, Label, PrimaryButton, TextField } from 'office-ui-fabric-react';
import * as strings from 'DemoSpfxWebPartStrings';
import ListUrls from '../../../data/ListUrls';
import { IMyListItem } from '../../../models/IMyListItem';

import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import FieldNames from '../../../data/FieldNames';

export default class DemoSpfx extends React.Component<IDemoSpfxProps, IDemoSpfxState> {

  private listId: string;
  constructor(props: IDemoSpfxProps) {
    super(props);

    this.state = {
      lists: new Array<IListInfo>()
    }
  }
  async componentDidMount() {
    try {
      const response = await this.props.wpContext.spHttpClient.get(
        this.props.wpContext.pageContext.web.absoluteUrl + "/_api/web/lists?$select=Id,Title&$filter=Hidden eq false",
        SPHttpClient.configurations.v1
      );

      const responseJSON = await response.json();
      console.log(responseJSON);
      const currentSiteLists = new Array<IListInfo>();
      for (let index = 0; index < responseJSON.value.length; index++) {
        const element = responseJSON.value[index];
        currentSiteLists.push(
          {
            id: element['Id'],
            title: element['Title']
          }
        )
      }



      const listId = await this.props.listService.getListIdByRelUrl(ListUrls.CRUDDemo)
      this.listId = listId;
      //const listData: IMyListItem[] = await this.props.listService.getListDataById(listId);

      const listData = await this.props.listService.getListDataByCamlQuery(
        ListUrls.CRUDDemo,
        `<Query>
            <Where>
              <Gt>
                <FieldRef Name='Number1' />
                <Value Type='Number'>350</Value>
              </Gt>
            </Where>
         </Query>
        `,
        [FieldNames.BooleanField, FieldNames.Title, FieldNames.Number1]
      );

      console.log(listData);


      this.setState(
        (prevState: IDemoSpfxState): IDemoSpfxState => {
          const newState = cloneDeep(prevState);
          newState.lists = currentSiteLists;
          return newState;
        }
      );

    }
    catch (error) {
      console.log(error);
    }




  }
  public render(): React.ReactElement<IDemoSpfxProps> {
    console.log(this.context);
    return (
      <div className={styles.myContainer}>

        <Label className={styles.welcomeMessage}>{strings.MessageTextHello} {this.props.wpContext.pageContext.user.displayName}  </Label>


        <TextField />

        <ul className="myFixedClassName">
          {
            this.state.lists.map(
              (currentList: IListInfo) => {
                return <li>
                  {currentList.title}
                </li>
              }
            )
          }
        </ul>
        <PrimaryButton label="Add Data" onClick={this.onAddData.bind(this)}>Add Data</PrimaryButton>
        <PrimaryButton label="Update Data" onClick={this.onUpdateData.bind(this)}>Update Data</PrimaryButton>

        <PeoplePicker
          ensureUser={true}
          context={this.props.wpContext}
          principalTypes={[PrincipalType.User]}
        ></PeoplePicker>
      </div>
    );
  }



  private onAddData = async (): Promise<void> => {


    // lists/getbytitle('')/items
    //lists/getbyid(guid'')/items
    //lists/getlist('')

    const body = {
      // "__metadata": {
      //   "type": "SP.Data.CRUDDemoListItem"
      // },
      "Title": "Sample"
    }

    const dataAdded = await this.props.wpContext.spHttpClient.post(
      this.props.wpContext.pageContext.web.absoluteUrl +
      "/_api/web/lists/getbyid(guid'" + this.listId + "')/items",
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json;odata=verbose",
          'Content-type': 'application/json;odata=nometadata',
          'odata-version': ''
        },
        body: JSON.stringify(body)
      }
    );
    console.log(await dataAdded.json());


  }

  private onUpdateData = async (): Promise<void> => {


    // lists/getbytitle('')/items
    //lists/getbyid(guid'')/items
    //lists/getlist('')

    const body = {
      // "__metadata": {
      //   "type": "SP.Data.CRUDDemoListItem"
      // },
      "Title": "Sample Updated"
    }

    const dataAdded = await this.props.wpContext.spHttpClient.post(
      this.props.wpContext.pageContext.web.absoluteUrl +
      "/_api/web/lists/getbyid(guid'" + this.listId + "')/items(3)",
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json;odata=verbose",
          'Content-type': 'application/json;odata=nometadata',
          'odata-version': '',
          'IF-MATCH': "*",
          'X-HTTP-Method': 'MERGE'
        },
        body: JSON.stringify(body)
      }
    );
    console.log(await dataAdded.json());


  }
}
