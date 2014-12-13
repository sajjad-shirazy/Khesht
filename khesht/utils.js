/// <amd-dependency path="jquery"/>
define(["require", "exports", 'khesht/app', "jquery"], function (require, exports, APP) {
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
        Utils.formatMoney = function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        Utils.parsURL = function (params) {
            if (params === void 0) { params = location.search; }
            var pairs = params.replace(/^\?/, '').split(/&/);
            var args = {};
            this.each(pairs, function (index, pair) {
                if (pair.length > 0) {
                    pair = pair.split('=');
                    args[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
                }
            });
            return args;
        };
        /*
        * returns clean URL of current location
        */
        Utils.url = function (args) {
            if (args === void 0) { args = null; }
            var dir = [window.location.protocol, '//', window.location.host, location.pathname].join('');
            return dir.slice(0, dir.lastIndexOf('/') + 1) + this.param(args);
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
        * - paths automaticly match with requireJS configs
        */
        Utils.ajax = function (path, data, success, options) {
            if (options === void 0) { options = {}; }
            $.extend(options, {
                data: data,
                url: require.toUrl(path),
                success: success,
                error: this.error.bind(this)
            });
            return $.ajax(options);
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
        * - paths automaticly match with requireJS configs
        */
        Utils.getJSON = function (path, data, success, options) {
            if (options === void 0) { options = {}; }
            $.extend(options, {
                dataType: 'json'
            });
            return this.ajax(path, data, success, options);
        };
        /*
        * calls a KAPI api request
        * - fails automaticly will handel
        * - if you set a callback on `argsfail` on options you can trace args errors
        */
        Utils.api = function (call, args, success, options) {
            var _this = this;
            if (args === void 0) { args = {}; }
            if (options === void 0) { options = {}; }
            args = args || {};
            if (args instanceof FormData) {
                args.append('call', call);
            }
            else {
                $.extend(args, {
                    call: call
                });
            }
            //validating inputs
            if (options['argsfail']) {
                var fails = new Array();
                this.each(args, function (i, value) {
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
                var error = json ? json.error : null;
                if (error) {
                    _this.error(error, 'api "' + call + '" call failed');
                    if (options['onerror']) {
                        options['onerror'](error);
                    }
                }
                else if (success) {
                    _this.log('api "', call, '" call returned:', json);
                    success(json);
                }
            }, options);
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
        Utils.UID = Date.now();
        return Utils;
    })();
    return Utils;
});
//# sourceMappingURL=utils.js.map