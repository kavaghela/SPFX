import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { 
  sp,
  ClientSidePage,
} from "@pnp/sp";


export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {


  constructor(props: IHelloWorldProps) {
    super(props);
  }


  componentDidMount() {
    
    ClientSidePage.fromFile(sp.web.getFileByServerRelativeUrl("/sites/spfx/SitePages/List-Form.aspx")).then(
      (page) => {
        console.log(page);
      }
    );    
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld} >
        {this.props.description}
      </div >
    );
  }
}
