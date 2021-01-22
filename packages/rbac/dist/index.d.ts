/// <reference types="global" />
export declare class RBAC {
    protected rawOptions: JSONObject | undefined;
    protected options: JSONObject[] | undefined;
    protected context: JSONObject | undefined;
    constructor(options?: JSONObject);
    loadRaw: (options: JSONObject) => void;
    loadAccess: (listOption: JSONObject) => void;
    getAccess: (roles: string[], context: JSONObject) => {
        options: any;
        context: JSONObject;
    };
    can: (action: string, target: string, listOption?: JSONObject | undefined) => {
        granted: boolean;
        access: any;
        context: any;
    } | {
        granted: boolean;
        access?: undefined;
        context?: undefined;
    };
}
