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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import styles from './DemoSpfx.module.scss';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';
import { TextField } from 'office-ui-fabric-react';
var DemoSpfx = /** @class */ (function (_super) {
    __extends(DemoSpfx, _super);
    function DemoSpfx(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            lists: new Array()
        };
        return _this;
    }
    DemoSpfx.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseJSON, currentSiteLists_1, index, element, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.props.wpContext.spHttpClient.get(this.props.wpContext.pageContext.web.absoluteUrl + "/_api/web/lists?$select=Id,Title&$filter=Hidden eq false", SPHttpClient.configurations.v1)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseJSON = _a.sent();
                        console.log(responseJSON);
                        currentSiteLists_1 = new Array();
                        for (index = 0; index < responseJSON.value.length; index++) {
                            element = responseJSON.value[index];
                            currentSiteLists_1.push({
                                id: element['Id'],
                                title: element['Title']
                            });
                        }
                        this.setState(function (prevState) {
                            var newState = cloneDeep(prevState);
                            newState.lists = currentSiteLists_1;
                            return newState;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DemoSpfx.prototype.render = function () {
        console.log(this.context);
        return (React.createElement("div", { className: styles.demoSpfx },
            "Hello ",
            this.props.wpContext.pageContext.user.displayName,
            React.createElement(TextField, null),
            React.createElement("ul", null, this.state.lists.map(function (currentList) {
                return React.createElement("li", null, currentList.title);
            }))));
    };
    return DemoSpfx;
}(React.Component));
export default DemoSpfx;
//# sourceMappingURL=DemoSpfx.js.map