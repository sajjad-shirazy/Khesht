/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jquery.form"/>
define(["require", "exports", 'khesht/app', "jquery", "jquery.form"], function (require, exports, APP) {
    var $ = require("jquery");
    var Utils = (function () {
        function Utils() {
        }
        Utils.isString = function (value) {
            return $.type(value) === "string";
        };
        /*
        * returns a unique id
        */
        Utils.uniqueId = function () {
            return (Utils.UID++).toString(36);
        };
        Utils.appendString = function (data) {
            $.extend(this.strings, data);
        };
        Utils.appendStringPack = function (name, lang) {
            var _this = this;
            this.getJSON(['str/', name, '_', lang, '.json'].join(''), null, function (json) {
                $.extend(_this.strings, json);
                _this.log('string pack loaded:', name);
            }, null, { async: false });
        };
        Utils.str = function (key) {
            if (!key)
                return null;
            var result = this.strings;
            jQuery(key.split('.')).each(function (index, value) {
                if (!result) {
                    return;
                }
                result = result[value];
            });
            return result ? result.trim() : ['[', key, ']'].join('');
        };
        /*
        * it's like JQuery each but also works if given array is null
        * you can also bind it simply with adding to parameters
        */
        Utils.each = function (target, func, bind) {
            return $.each(target || [], bind ? func.bind(bind) : func);
        };
        Utils.param = function (obj) {
            return obj ? '?' + $.param(obj) : '';
        };
        /*
        * removes repeated members of given array
        */
        Utils.uniqe = function (array) {
            return array.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
        };
        /*
        * creates an object with URL parameters values
        */
        Utils.parsURL = function (url) {
            if (url === void 0) { url = location.search; }
            var pairs = url.slice(url.lastIndexOf('?')).replace(/^\?/, '').split(/&/);
            var args = {};
            this.each(pairs, function (index, pair) {
                if (pair.length > 0) {
                    pair = pair.split('=');
                    args[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
                }
            });
            return args;
        };
        Object.defineProperty(Utils, "url", {
            get: function () {
                return [window.location.protocol, '//', window.location.host, location.pathname].join('');
            },
            enumerable: true,
            configurable: true
        });
        /*
        * returns clean URL of current location
        */
        Utils.baseURL = function (args, path) {
            if (args === void 0) { args = null; }
            if (path === void 0) { path = '/'; }
            var url = this.url;
            return url.slice(0, url.lastIndexOf('/')) + path + this.param(args);
        };
        Utils.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args = Array.prototype.slice.call(args);
            args.unshift(['<', APP.config.name, '> - '].join(''));
            console.log.apply(console, args);
        };
        Utils.error = function (data, error) {
            console.error.apply(console, [['<', APP.config.name, ' error> - ', error, ':'].join(''), data]);
        };
        /*
        * create an ajax request
        * - fails automaticly will handel
        */
        Utils.ajax = function (options) {
            if (options === void 0) { options = {}; }
            var output = $.ajax(options);
            output.fail(this.error.bind(this));
            return output;
        };
        /*
        * starts a set of ajax requests and calss success when all of them fetched
        * - fails automaticly will handel
        * - ajax results automaticly will pass to success
        */
        Utils.when = function (requests, success, fail) {
            var _this = this;
            var results = {};
            if (requests && Object.keys(requests).length > 0) {
                this.each(requests, function (key, request) {
                    request.done(function (data) {
                        data = data && data.error ? null : data;
                        results[key] = data;
                        _this.log('ajax request recived :', key, '=', data);
                    }).fail(null);
                });
                $.when.apply(this, $.map(requests, function (xhr, key) {
                    return xhr;
                })).then(function () {
                    if (success)
                        success(results);
                }).fail(function (jqXHR, textStatus) {
                    fail ? fail() : _this.error(jqXHR, 'ajax set request failed : ' + textStatus);
                });
            }
            else {
                if (success)
                    success(results);
            }
        };
        /*
        * create an ajax JSON request
        * - fails automaticly will handel
        * - you can send a form jQuery element as data but getJSON will return null instead of JQueryXHR
        */
        Utils.getJSON = function (url, data, success, fail, options) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (options === void 0) { options = {}; }
            options = $.extend({
                dataType: 'json',
                url: url,
                data: data,
                success: function (json) {
                    var error = json ? json.error : null;
                    if (error) {
                        if (fail) {
                            fail(error);
                        }
                        _this.error(error, 'server error');
                    }
                    else if (success) {
                        _this.log('server call returned:', json);
                        success(json);
                    }
                },
                error: fail
            }, options);
            if (data instanceof jQuery) {
                delete options.data;
                data.prop('tagName') == 'FORM' && data.ajaxSubmit(options);
                return null;
            }
            else {
                return this.ajax(options);
            }
        };
        Utils.apiURL = function (call, args) {
            if (args === void 0) { args = null; }
            args = args || {};
            args.call = call;
            return $.param(args);
        };
        /*
        * calls a KAPI api request
        * - fails automaticly will handel
        */
        Utils.api = function (call, args, success, fail, options) {
            if (args === void 0) { args = null; }
            if (options === void 0) { options = {}; }
            args = args || {};
            args.call = call;
            return this.getJSON(require.toUrl('api/'), args, success, fail, options);
        };
        /*
        * loads a requireJS module
        * - fails automaticly will handel
        * - paths automaticly match with requireJS configs
        */
        Utils.loadModule = function (modulePath, success, fail) {
            var _this = this;
            require.call(null, [modulePath], function (module) {
                _this.log('module file loaded:', modulePath);
                success(module);
            }, function (err) {
                _this.error(err.requireModules && err.requireModules[0], 'loading module failed');
                if (fail)
                    fail();
            });
        };
        Utils.strings = {};
        Utils.UID = Date.now();
        return Utils;
    })();
    return Utils;
});
//# sourceMappingURL=utils.js.map