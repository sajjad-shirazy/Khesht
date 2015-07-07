var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht.bootstrap/dom', 'khesht/element'], function (require, exports, U, D, Element) {
    var $ = require("jquery");
    var TabControl = (function (_super) {
        __extends(TabControl, _super);
        /**
        * items : [[title,content], [title,content],...]
        */
        function TabControl(items) {
            var _this = this;
            _super.call(this, D.div().append(this.ul_headers = D.ul(null, $.extend({ role: 'tablist' })).addClass('nav nav-tabs'), this.div_panels = D.div().addClass('tab-content')));
            U.each(items, function (i, item) {
                _this.addTab(item[0], item[1]);
            });
            this.ul_headers.children().first().addClass('active');
            this.ul_headers.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                _this.dispatchEvent('change');
            });
            this.div_panels.children().first().addClass('active');
        }
        Object.defineProperty(TabControl.prototype, "selectedIndex", {
            get: function () {
                return this.ul_headers.find('.active').index();
            },
            enumerable: true,
            configurable: true
        });
        TabControl.prototype.addTab = function (title, content) {
            var id = U.uniqueId();
            this.ul_headers.append(D.li().append(D.a({ href: '#' + id, 'data-toggle': 'tab' }).append(title)));
            this.div_panels.append(D.div({ id: id }).addClass('tab-pane').append(content));
        };
        TabControl.prototype.removeTab = function (index) {
            this.ul_headers.children().eq(index).remove();
            this.div_panels.eq(index).remove();
            this.selectTab(0);
        };
        TabControl.prototype.enableTab = function (index) {
            this.ul_headers.children().eq(index).removeClass('disabled').css('pointer-events', '');
            this.selectTab(index);
        };
        TabControl.prototype.disableTab = function (index) {
            this.ul_headers.children().eq(index).addClass('disabled').css('pointer-events', 'none');
            this.selectTab(0);
        };
        TabControl.prototype.selectTab = function (index) {
            this.ul_headers.find('a[data-toggle="tab"]').eq(index).click();
        };
        return TabControl;
    })(Element);
});
//# sourceMappingURL=tabcontrol.js.map