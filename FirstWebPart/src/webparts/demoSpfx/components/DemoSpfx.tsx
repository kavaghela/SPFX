import * as React from 'react';
import styles from './DemoSpfx.module.scss';
import { IDemoSpfxProps } from './IDemoSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class DemoSpfx extends React.Component<IDemoSpfxProps, {}> {
  public render(): React.ReactElement<IDemoSpfxProps> {
    console.log(this.context);
    return (
      <div className={styles.demoSpfx}>
        Hello {this.props.wpContext.pageContext.user.displayName}
      </div>
    );
  }
}
