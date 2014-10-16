var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/eventdispatcher', 'khesht/topmenu'], function(require, exports, EventDispatcher, TopMenu) {
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page() {
            _super.call(this);
            B.body.empty();
            NProgress.inc();
            this.header();
            this.main();
        }
        Page.prototype.header = function (brand) {
            if (typeof brand === "undefined") { brand = B.a({ href: APP.getURL() }).append(APP.str('app.brand'), ' ', APP.config.version ? B.small().append(B.kbd(APP.config.version)) : null); }
            B.topmenusCount = 0;
            this.topMenu = new TopMenu(brand);
        };
        Page.prototype.main = function () {
            this.div_container = B.div().addClass('container').append(this.div_main = B.div()).appendTo(B.body);
        };
        Page.prototype.footer = function (content) {
            if (typeof content === "undefined") { content = APP.str('app.copyright'); }
            B.body.append(B.div().addClass('container').append(B.br(), B.hr(), B.pageFooter().append(content)));
        };
        Page.prototype.finish = function () {
            this.footer();
            this.dispatchEvent('done');
            NProgress.done();
        };
        Page.input = function (control, lable, desc, lableWidth) {
            if (typeof lableWidth === "undefined") { lableWidth = 4; }
            return B.labeledControl(null, lable, desc, lableWidth, control);
        };
        Page.icons = {};
        return Page;
    })(EventDispatcher);
    
    return Page;
});
//# sourceMappingURL=page.js.map
