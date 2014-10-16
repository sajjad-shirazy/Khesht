interface IAPP {
    args: any;
    config: any;
    page: IPage;
    str(key: string): string;
    log(...args: any[]);
    error(data, error);
    getURL(): string;
    loadPage(name: string);
    api(call: string, args: any, success: Function, options?: JQueryAjaxSettings): JQueryXHR;
    require(modulePath: string, success: Function, fail?: Function);
    loadingDOM(): JQuery;
}
declare var APP: IAPP; 