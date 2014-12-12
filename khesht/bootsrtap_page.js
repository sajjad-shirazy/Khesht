var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/component', 'khesht/topmenu'], function (require, exports, B, TopMenu) {
    var BPage = (function (_super) {
        __extends(BPage, _super);
        function BPage() {
            _super.call(this);
            B.body.empty();
            NProgress.inc();
            //APP.require(this.requires, () => {
            this.header();
            this.main();
            //});
        }
        BPage.prototype.requires = function () {
            return _super.prototype.stylesheets.call(this).concat([
                'nprogress/js/nprogress.min'
            ]);
        };
        BPage.prototype.stylesheets = function () {
            return _super.prototype.stylesheets.call(this).concat([
                'nprogress/css/nprogress.min.css'
            ]);
        };
        BPage.prototype.ajaxInputs = function () {
            return [];
        };
        BPage.prototype.header = function (brand) {
            if (brand === void 0) { brand = B.a({ href: APP.getURL() }).append(APP.str('app.brand')); }
            //B.topmenusCount = 0;
            this.topMenu = new TopMenu(brand);
        };
        BPage.prototype.main = function () {
            this.div_container = B.div().addClass('container').append(this.div_main = B.div()).appendTo(B.body);
        };
        BPage.prototype.footer = function (content) {
            if (content === void 0) { content = APP.str('app.copyright'); }
            //B.body.append(B.div().addClass('container').append(B.br(), B.hr(), B.pageFooter().append(content)));
        };
        BPage.prototype.finish = function () {
            this.footer();
            this.dispatchEvent('done');
            NProgress.done();
        };
        BPage.prototype.rtl = function () {
            APP.attachStyle('css/bootstrap-rtl.min.css');
            this.topMenu.ul_rightMenu.addClass('pull-left');
        };
        return BPage;
    })(B);
});
//# sourceMappingURL=bootsrtap_page.js.map