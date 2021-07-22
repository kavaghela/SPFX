var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField, PropertyPaneCheckbox, PropertyPaneChoiceGroup, } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'DemoSpfxWebPartStrings';
import DemoSpfx from './components/DemoSpfx';
var DemoSpfxWebPart = /** @class */ (function (_super) {
    __extends(DemoSpfxWebPart, _super);
    function DemoSpfxWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DemoSpfxWebPart.prototype.render = function () {
        var element = React.createElement(DemoSpfx, {
            description: this.properties.description,
            property1: this.properties.prop1,
            wpContext: this.context
        });
        ReactDom.render(element, this.domElement);
    };
    DemoSpfxWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(DemoSpfxWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    DemoSpfxWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: "Use this panel to configure web part"
                    },
                    groups: [
                        {
                            groupName: "My Group1",
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
                                PropertyPaneChoiceGroup("choice", {
                                    options: [{ key: "Choice1", text: "Choice 1" }, { key: "Choice2", text: "Choice 2" }],
                                    label: "Choice Property Pane"
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return DemoSpfxWebPart;
}(BaseClientSideWebPart));
export default DemoSpfxWebPart;
//# sourceMappingURL=DemoSpfxWebPart.js.map