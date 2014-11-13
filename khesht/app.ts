import EventDispatcher = require('khesht/eventdispatcher');

class APP extends EventDispatcher implements IAPP{
    config: any;
    page: IPage;
    args: any = {};
    strings: any = {};
    constructor(config: any) {
        super();
        this.config = config;
        document.title = this.config.name = this.config.name || 'khesht';
        this.log('starting ...');
        this.attachStyle('nprogress/css/nprogress.min.css');
        this.attachStyle('bootstrap/css/bootstrap.min.css');
        NProgress.start();
        this.parsURL();
    }
    require(modulePath: string, success: Function, fail?: Function) {
        require.call(null, [modulePath], ((Class) => {
            this.log('module loaded:', modulePath);
            success(Class);
        }).bind(this), ((err) => {
                this.error(err.requireModules && err.requireModules[0], 'module loading failed');
                if (fail) fail();
            }).bind(this));
    }
    loadPage(name?: string) {
        name = name || this.args.page || this.config.index;
        this.require(['pages/', name].join(''), (Page) => {
            this.page = new Page();
            this.dispatchEvent('onpageload');
        }, () => { this.loadPage('notfound'); });
    }
    addStringPack(name: string):void {
        this.getJSON(['str/', name, '_', this.config.lang, '.json'].join(''), null, ((json) => {
            $.extend(this.strings, json);
            this.log('string pack loaded:', name);
        }).bind(this), { async: false });
    }
    /// if you set a callback on `argsfail` on options you can trace args errors
    api(call: string, args: any, success: Function, options: JQueryAjaxSettings = {}): JQueryXHR {
        args = args || {};
        $.extend(args, {
            call: call
        });
        //validating inputs
        if (options['argsfail']) {
            var fails = new Array();
            B.each(args, (i, value) => {
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
            var error: any = !json || json.error;
            if (error) {
                this.error(error, 'error on API call');
            }
            success(json);
        }, options);
    }
    getJSON(path: string, data: any, success: Function, options: JQueryAjaxSettings = {}): JQueryXHR {
        $.extend(options, {
            dataType: 'json'
        });
        return this.ajax(path, data, success, options);
    }
    ajax(path: string, data: any, success: Function, options: JQueryAjaxSettings = {}):JQueryXHR {
        $.extend(options, {
            data: data,
            url: require.toUrl(path),
            success: success,
            error: this.error.bind(this)
        });
        return $.ajax(options);
    }
    str(key: string): string {
        var result: any = this.strings;
        $(key.split('.')).each(function (index, value) {
            if (!result) {
                return;
            }
            result = result[value];
        });
        return result != undefined ? result : ['[', key, ']'].join(''); 
    }
    public attachStyle(path): JQuery {
        path = require.toUrl(path);
        this.log('style loading:', path);
        return B.head.append(B.dom('link', { rel: 'stylesheet', href: path }));
    }
    public log(...args: any[]) {
        args = Array.prototype.slice.call(args);
        args.unshift(['<', this.config.name, '> - '].join(''));
        console.log.apply(console, args);
    }
    public error(data, error) {
        console.error.apply(console, [['<', this.config.name, ' error> - ', error, ':'].join(''), data]);
    }
    private parsURL() {
        var pairs = location.search.replace(/^\?/, '').split(/&/);
        B.each(pairs, function (index, pair) {
            if ((<string>pair).length > 0) {
                pair = pair.split('=');
                this.args[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
            }
        }, this);
    }
    getURL(): string {
        var dir = location['origin'] + location.pathname;
        return dir.slice(0, dir.lastIndexOf('/') + 1);
    }
    loadingDOM(): JQuery {
        return B.center().append(B.img({ src: 'images/loading.gif' }));
    }
}
export = APP;