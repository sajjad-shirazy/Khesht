/// <amd-dependency path="jquery"/>

import APP = require('khesht/app');

class Utils {
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
    static formatMoney(value:number): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    static parsURL(params:string = location.search): any {
        var pairs = params.replace(/^\?/, '').split(/&/);
        var args = {};
        this.each(pairs, function (index, pair) {
            if ((<string>pair).length > 0) {
                pair = pair.split('=');
                args[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
            }
        });
        return args;
    }
    /*
    * returns clean URL of current location
    */
    static url(args: any = null): string {
        var dir = [window.location.protocol, '//', window.location.host, location.pathname].join('');
        return dir.slice(0, dir.lastIndexOf('/') + 1) + this.param(args);
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
    * - paths automaticly match with requireJS configs
    */
    static ajax(path: string, data: any, success: Function, options: JQueryAjaxSettings = {}): JQueryXHR {
        $.extend(options, {
            data: data,
            url: require.toUrl(path),
            success: success,
            error: this.error.bind(this)
        });
        return $.ajax(options);
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
    * - paths automaticly match with requireJS configs
    */
    static getJSON(path: string, data: any, success: Function, options: JQueryAjaxSettings = {}): JQueryXHR {
        $.extend(options, {
            dataType: 'json'
        });
        return this.ajax(path, data, success, options);
    }

    /*
    * calls a KAPI api request
    * - fails automaticly will handel 
    * - if you set a callback on `argsfail` on options you can trace args errors
    */
    static api(call: string, args: any = {}, success?: (data: any) => void, options: JQueryAjaxSettings = {}): JQueryXHR {
        args = args || {};
        if (args instanceof FormData) {
            (<FormData>args).append('call', call);
        } else {
            $.extend(args, {
                call: call
            });
        }
        //validating inputs
        if (options['argsfail']) {
            var fails = new Array();
            this.each(args, (i, value) => {
                switch (typeof value) {
                    case 'string':
                        if (value == '') fails.push(i);
                        break;
                    case 'number':
                    case 'boolean':
                        break;
                    default:
                        fails.push(i);
                }
            });
            if (fails.length > 0) {
                options['argsfail'](fails);
                return;
            }
        }
        return this.getJSON('api/', args, (json) => {
            var error: any = json ? json.error : null;
            if (error) {
                this.error(error, 'api "' + call + '" call failed');
                if (options['onerror']) {
                    options['onerror'](error);
                }
            } else if (success) {
                this.log('api "', call, '" call returned:', json);
                success(json);
            }
        }, options);
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