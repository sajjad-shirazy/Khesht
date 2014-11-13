var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/eventdispatcher'], function(require, exports, EventDispatcher) {
    var APP = (function (_super) {
        __extends(APP, _super);
        function APP(config) {
            _super.call(this);
            this.args = {};
            this.strings = {};
            this.config = config;
            document.title = this.config.name = this.config.name || 'khesht';
            this.log('starting ...');
            this.attachStyle('nprogress/css/nprogress.min.css');
            this.attachStyle('bootstrap/css/bootstrap.min.css');
            NProgress.start();
            this.parsURL();
        }
        APP.prototype.require = function (modulePath, success, fail) {
            var _this = this;
            require.call(null, [modulePath], (function (Class) {
                _this.log('module loaded:', modulePath);
                success(Class);
            }).bind(this), (function (err) {
                _this.error(err.requireModules && err.requireModules[0], 'module loading failed');
                if (fail)
                    fail();
            }).bind(this));
        };
        APP.prototype.loadPage = function (name) {
            var _this = this;
            name = name || this.args.page || this.config.index;
            this.require(['pages/', name].join(''), function (Page) {
                _this.page = new Page();
                _this.dispatchEvent('onpageload');
            }, function () {
                _this.loadPage('notfound');
            });
        };
        APP.prototype.addStringPack = function (name) {
            var _this = this;
            this.getJSON(['str/', name, '_', this.config.lang, '.json'].join(''), null, (function (json) {
                $.extend(_this.strings, json);
                _this.log('string pack loaded:', name);
            }).bind(this), { async: false });
        };

        /// if you set a callback on `argsfail` on options you can trace args errors
        APP.prototype.api = function (call, args, success, options) {
            if (typeof options === "undefined") { options = {}; }
            var _this = this;
            args = args || {};
            $.extend(args, {
                call: call
            });

            //validating inputs
            if (options['argsfail']) {
                var fails = new Array();
                B.each(args, function (i, value) {
                    switch (typeof value) {
                        case 'string':
                            if (value == '')
                                fails.push(i);
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
            return this.getJSON('api/', args, function (json) {
                var error = !json || json.error;
                if (error) {
                    _this.error(error, 'error on API call');
                }
                success(json);
            }, options);
        };
        APP.prototype.getJSON = function (path, data, success, options) {
            if (typeof options === "undefined") { options = {}; }
            $.extend(options, {
                dataType: 'json'
            });
            return this.ajax(path, data, success, options);
        };
        APP.prototype.ajax = function (path, data, success, options) {
            if (typeof options === "undefined") { options = {}; }
            $.extend(options, {
                data: data,
                url: require.toUrl(path),
                success: success,
                error: this.error.bind(this)
            });
            return $.ajax(options);
        };
        APP.prototype.str = function (key) {
            var result = this.strings;
            $(key.split('.')).each(function (index, value) {
                if (!result) {
                    return;
                }
                result = result[value];
            });
            return result != undefined ? result : ['[', key, ']'].join('');
        };
        APP.prototype.attachStyle = function (path) {
            path = require.toUrl(path);
            this.log('style loading:', path);
            return B.head.append(B.dom('link', { rel: 'stylesheet', href: path }));
        };
        APP.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            args = Array.prototype.slice.call(args);
            args.unshift(['<', this.config.name, '> - '].join(''));
            console.log.apply(console, args);
        };
        APP.prototype.error = function (data, error) {
            console.error.apply(console, [['<', this.config.name, ' error> - ', error, ':'].join(''), data]);
        };
        APP.prototype.parsURL = function () {
            var pairs = location.search.replace(/^\?/, '').split(/&/);
            B.each(pairs, function (index, pair) {
                if (pair.length > 0) {
                    pair = pair.split('=');
                    this.args[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
                }
            }, this);
        };
        APP.prototype.getURL = function () {
            var dir = location['origin'] + location.pathname;
            return dir.slice(0, dir.lastIndexOf('/') + 1);
        };
        APP.prototype.loadingDOM = function () {
            return B.center().append(B.img({ src: 'images/loading.gif' }));
        };
        return APP;
    })(EventDispatcher);
    
    return APP;
});
//# sourceMappingURL=app.js.map
