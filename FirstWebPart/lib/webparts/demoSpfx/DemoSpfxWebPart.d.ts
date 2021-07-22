import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IDemoSpfxWebPartProps {
    description: string;
    prop1: string;
    isEnable: boolean;
    choice: string;
}
export default class DemoSpfxWebPart extends BaseClientSideWebPart<IDemoSpfxWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=DemoSpfxWebPart.d.ts.map