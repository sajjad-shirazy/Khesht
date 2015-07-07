var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht/dom', 'khesht/component'], function (require, exports, U, D, Base) {
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(args, dom) {
            if (args === void 0) { args = {}; }
            if (dom === void 0) { dom = D.body.empty(); }
            this.args = args;
            NProgress.inc();
            _super.call(this, dom);
        }
        Page.load = function (args) {
            var _this = this;
            if (args === void 0) { args = U.parsURL(); }
            NProgress.start();
            if (U.isString(args)) {
                args = { page: args };
            }
            args.page = args.page || 'index';
            if (this.current) {
                window.history.pushState(args, '', U.baseURL(args));
            }
            if (!this.historyListener) {
                jQuery(window).on('popstate', function () {
                    U.log(history.state);
                    if (history.state && history.state.page) {
                        _this.load(history.state);
                    }
                });
                this.historyListener = true;
            }
            U.loadModule('pages/' + args.page, function (Class) {
                Page.current = new Class(args);
            }, function () {
                if (args.page != 'notfound') {
                    _this.load({ page: 'notfound' });
                }
            });
        };
        Page.navigate = function (e) {
            e.preventDefault();
            e.stopPropagation();
            Page.load(U.parsURL(jQuery(e.target).attr('href')));
            return false;
        };
        Page.prototype.start = function () {
            _super.prototype.start.call(this);
            this.header();
            this.body();
            this.footer();
            NProgress.done();
        };
        Page.prototype.header = function () {
        };
        Page.prototype.body = function () {
        };
        Page.prototype.footer = function () {
        };
        Object.defineProperty(Page.prototype, "url", {
            get: function () {
                return U.baseURL(this.args);
            },
            enumerable: true,
            configurable: true
        });
        return Page;
    })(Base);
    return Page;
});
//# sourceMappingURL=page.js.map