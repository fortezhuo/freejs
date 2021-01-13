/// <reference types="global" />
export declare class RBAC {
    protected rawOptions: JSONObject | undefined;
    protected options: JSONObject[] | undefined;
    protected context: JSONObject | undefined;
    constructor(options?: JSONObject);
    loadRaw: (options: JSONObject) => void;
    loadAccess: (access: JSONObject) => void;
    register: (roles: string[], context: JSONObject) => void;
    getAccess: () => {
        options: JSONObject[] | undefined;
        context: JSONObject | undefined;
    };
    can: (action: string, target: string) => {
        granted: boolean;
        access: JSONObject;
        context: JSONObject | undefined;
    } | {
        granted: boolean;
        access?: undefined;
        context?: undefined;
    };
}
