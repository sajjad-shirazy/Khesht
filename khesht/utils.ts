/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jquery.form"/>

import APP = require('khesht/app');
var $:JQueryStatic = require("jquery");

class Utils {
    private static strings = {};
    private static UID = Date.now();
    static isString(value: any): boolean {
        return $.type(value) === "string";
    }
    /*
    * returns a unique id
    */
    static uniqueId(): string {
        return (Utils.UID++).toString(36);
    }
    static appendString(data): void {
        $.extend(this.strings, data);
    }
    static appendStringPack(name, lang): void {
        this.getJSON(['str/', name, '_', lang, '.json'].join(''), null, (json) => {
            $.extend(this.strings, json);
            this.log('string pack loaded:', name);
        }, null, { async: false });
    }
    static str(key): string {
        if (!key)
            return null;
        var result:any = this.strings;
        jQuery(key.split('.')).each(function (index, value) {
            if (!result) {
                return;
            }
            result = result[<any>value];
        });
        return result ? result.trim() : ['[', key, ']'].join('');
    }
    /*
    * it's like JQuery each but also works if given array is null
    * you can also bind it simply with adding to parameters
    */
    static each(target: any, func: (index: any, value: any) => any, bind?) {
        return $.each(target || [], bind ? func.bind(bind) : func);
    }
    static param(obj:any):string {
        return obj ? '?' + $.param(obj) : '';
    }
    /*
    * removes repeated members of given array
    */
    static uniqe(array: any[]): any[] {
        return array.filter(function (value, index, self) { return self.indexOf(value) === index; });
    }
    /*
    * creates an object with URL parameters values 
    */
    static parsURL(url:string = location.search): any {
        var pairs = url.slice(url.lastIndexOf('?')).replace(/^\?/, '').split(/&/);
        var args = {};
        this.each(pairs, function (index, pair) {
            if ((<string>pair).length > 0) {
                pair = pair.split('=');
                args[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
            }
        });
        return args;
    }
    static get url(): string {
        return [window.location.protocol, '//', window.location.host, location.pathname].join('');
    }
    /*
    * returns clean URL of current location
    */
    static baseURL(args: any = null, path: string = '/'): string {
        var url = this.url;
        return url.slice(0, url.lastIndexOf('/')) + path + this.param(args);
    }
    static log(...args: any[]) {
        args = Array.prototype.slice.call(args);
        args.unshift(['<', APP.config.name, '> - '].join(''));
        console.log.apply(console, args);
    }
    static error(data, error) {
        console.error.apply(console, [['<', APP.config.name, ' error> - ', error, ':'].join(''), data]);
    }
    /*
    * create an ajax request
    * - fails automaticly will handel 
    */
    static ajax(options: JQueryAjaxSettings = {}): JQueryXHR {
        var output = $.ajax(options);
        output.fail(this.error.bind(this));
        return output;
    }
    /*
    * starts a set of ajax requests and calss success when all of them fetched
    * - fails automaticly will handel 
    * - ajax results automaticly will pass to success 
    */
    static when(requests: any, success: (results: any) => void, fail?: () => void):void {
        var results: { key: string; data: any } = <any>{};
        if (requests && Object.keys(requests).length > 0) {
            this.each(requests, (key, request: JQueryXHR) => {
                request.done((data) => {
                    data = data && data.error ? null : data;
                    results[key] = data;
                    this.log('ajax request recived :', key, '=', data);
                }).fail(null);
            });
            $.when.apply(this, $.map(requests, function (xhr, key) { return xhr; })).then(
                () => {
                    if (success) success(results);
                }).fail(
                (jqXHR, textStatus) => {
                    fail ? fail() : this.error(jqXHR, 'ajax set request failed : ' + textStatus);
                });
        } else {
            if (success) success(results);
        }
    }
    /*
    * create an ajax JSON request
    * - fails automaticly will handel 
    * - you can send a form jQuery element as data but getJSON will return null instead of JQueryXHR
    */
    static getJSON(url: string, data: any = null, success?: (data: any) => void, fail?: (error: string) => void, options: JQueryAjaxSettings = {}): JQueryXHR {
        options = $.extend({
            dataType: 'json',
            url: url,
            data: data,
            success: (json) => {
                var error: any = json ? json.error : null;
                if (error) {
                    if (fail) {
                        fail(error);
                    }
                    this.error(error, 'server error');
                } else if (success) {
                    this.log('server call returned:', json);
                    success(json);
                }
            },
            error: fail
        }, options);
        if (data instanceof jQuery) {
            delete options.data;
            data.prop('tagName') == 'FORM' && data.ajaxSubmit(options);
            return null;
        } else {
            return this.ajax(options);
        }
    }
    static apiURL(call: string, args: any = null): string {
        args = args || {};
        args.call = call;
        return $.param(args);
    }
    /*
    * calls a KAPI api request
    * - fails automaticly will handel 
    */
    static api(call: string, args: any = null, success?: (data: any) => void, fail?: (error: string) => {}, options: JQueryAjaxSettings = {}): JQueryXHR {
        args = args || {};
        args.call = call;
        return this.getJSON(require.toUrl('api/'), args, success, fail, options);
    }
    /*
    * loads a requireJS module
    * - fails automaticly will handel 
    * - paths automaticly match with requireJS configs
    */
    static loadModule(modulePath: string, success: (module: any) => void, fail?: () => void) {
        require.call(null, [modulePath],
            (module) => {
                this.log('module file loaded:', modulePath);
                success(module);
            },
            (err) => {
                this.error(err.requireModules && err.requireModules[0], 'loading module failed');
                if (fail) fail();
            });
    }
}

export = Utils;