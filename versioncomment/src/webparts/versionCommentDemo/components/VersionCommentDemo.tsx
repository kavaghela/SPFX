import * as React from 'react';
import styles from './VersionCommentDemo.module.scss';
import { IVersionCommentDemoProps } from './IVersionCommentDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPFXContext, spfi, SPFI, SPFx } from "@pnp/sp";
import  "@pnp/sp/presets/all";
export default class VersionCommentDemo extends React.Component<IVersionCommentDemoProps, {}> {
  async componentDidMount() {
    
    const sp = spfi().using(SPFx((this.props.wpContext as unknown) as ISPFXContext))
    
    const currentItem =  await sp.web.lists.getByTitle("VersionDemo").items.getById(2).select('FileRef')();    

    // Get latest version comment 
    const lastestVersionComment = await sp.web.getFileByUrl(currentItem['FileRef'])();
    console.log(lastestVersionComment["UIVersionLabel"],lastestVersionComment['CheckInComment']);

    // In this method it will not return latest version it will return only previous version
    const olderVersionComments = await sp.web.getFileByUrl(currentItem['FileRef']).versions();
    olderVersionComments.forEach((currentVersion) => {
      console.log(currentVersion["VersionLabel"],currentVersion["CheckInComment"]);
    });
  }
  public render(): React.ReactElement<IVersionCommentDemoProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.versionCommentDemo} ${hasTeamsContext ? styles.teams : ''}`}>

      </section>
    );
  }
}
