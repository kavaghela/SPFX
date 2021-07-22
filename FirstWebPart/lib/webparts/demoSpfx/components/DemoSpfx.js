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
import styles from './DemoSpfx.module.scss';
var DemoSpfx = /** @class */ (function (_super) {
    __extends(DemoSpfx, _super);
    function DemoSpfx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DemoSpfx.prototype.render = function () {
        console.log(this.context);
        return (React.createElement("div", { className: styles.demoSpfx },
            "Hello ",
            this.props.wpContext.pageContext.user.displayName));
    };
    return DemoSpfx;
}(React.Component));
export default DemoSpfx;
//# sourceMappingURL=DemoSpfx.js.map