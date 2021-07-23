import * as React from 'react';
import styles from './DemoSpfx.module.scss';
import { IDemoSpfxProps } from './IDemoSpfxProps';
import { cloneDeep, escape } from '@microsoft/sp-lodash-subset';
import { IDemoSpfxState } from './IDemoSpfxState';
import { IListInfo } from '../../../models/IListInfo';
import { SPHttpClient } from '@microsoft/sp-http';
import { Label, TextField } from 'office-ui-fabric-react';
import * as strings from 'DemoSpfxWebPartStrings';

export default class DemoSpfx extends React.Component<IDemoSpfxProps, IDemoSpfxState> {
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

      </div>
    );
  }
}
