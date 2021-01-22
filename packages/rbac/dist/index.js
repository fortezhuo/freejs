"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAC = void 0;
const flattenDeep_1 = __importDefault(require("lodash/flattenDeep"));
const uniq_1 = __importDefault(require("lodash/uniq"));
class RBAC {
    constructor(options) {
        this.loadRaw = (options) => {
            this.rawOptions = flatten(options);
        };
        this.loadAccess = (listOption) => {
            this.options = listOption.options;
            this.context = listOption.context;
        };
        this.getAccess = (roles, context) => {
            var _a;
            const options = (_a = this.rawOptions) === null || _a === void 0 ? void 0 : _a.filter((opt) => roles.indexOf(opt.role) >= 0);
            return { options, context };
        };
        this.can = (action, target, listOption) => {
            const options = (listOption === null || listOption === void 0 ? void 0 : listOption.options) || this.options;
            const context = (listOption === null || listOption === void 0 ? void 0 : listOption.context) || this.context;
            const access = (options || []).find((opt) => (opt.can.indexOf("all") >= 0 || opt.can.indexOf(action) >= 0) &&
                opt.on === target);
            return access ? { granted: true, access, context } : { granted: false };
        };
        this.rawOptions = flatten(options);
    }
}
exports.RBAC = RBAC;
const merge = (array, role) => {
    const reducer = array.reduce((acc, obj) => {
        if (acc[obj.on]) {
            acc[obj.on].can = uniq_1.default([...(acc[obj.on].can || []), ...(obj.can || [])]);
        }
        else {
            acc[obj.on] = Object.assign(Object.assign({}, obj), { role: role });
        }
        return acc;
    }, {});
    return [...Object.keys(reducer).map((key) => reducer[key])];
};
const flatten = (options) => {
    return options
        ? flattenDeep_1.default(Object.keys(options).map((key) => {
            const { inherit: aInherit = [], list = [] } = options[key];
            return merge(list.concat(flattenDeep_1.default(aInherit.map((inherit) => options[inherit].list))), key);
        }))
        : [];
};
//# sourceMappingURL=index.js.map