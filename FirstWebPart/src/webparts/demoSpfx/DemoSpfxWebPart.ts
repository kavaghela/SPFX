import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DemoSpfxWebPartStrings';
import DemoSpfx from './components/DemoSpfx';
import { IDemoSpfxProps } from './components/IDemoSpfxProps';
import ListService from '../../services/ListService';

export interface IDemoSpfxWebPartProps {
  description: string;
  prop1: string;
  isEnable: boolean;
  choice: string;
}

export default class DemoSpfxWebPart extends BaseClientSideWebPart<IDemoSpfxWebPartProps> {

  private _listService: ListService;

  onInit = (): Promise<void> => {
    return new Promise<void>(
      (resolve) => {
        this._listService = new ListService(this.context);
        resolve();
      }
    );
  }

  public render(): void {
    const element: React.ReactElement<IDemoSpfxProps> = React.createElement(
      DemoSpfx,
      {
        description: this.properties.description,
        property1: this.properties.prop1,
        wpContext: this.context,
        listService: this._listService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })

              ]
            }
          ]
        },
        {
          header: {
            description: "Second Page"
          },
          groups: [
            {
              groupName: "My Group2",
              groupFields: [
                PropertyPaneTextField("prop1", {
                  label: "Property 1"
                }),
                PropertyPaneCheckbox("isEnable", {
                  checked: this.properties.isEnable,
                  text: "Enable or Disable"
                }),
                PropertyPaneChoiceGroup("choice",
                  {
                    options: [{ key: "Choice1", text: "Choice 1" }, { key: "Choice2", text: "Choice 2" }],
                    label: "Choice Property Pane"
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}


