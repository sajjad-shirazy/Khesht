var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht.bootstrap/dom', 'khesht/element'], function (require, exports, U, D, Element) {
    var $ = require("jquery");
    var Tab = (function (_super) {
        __extends(Tab, _super);
        /**
        * event : change
        * items : [[title,content], [title,content],...]
        */
        function Tab(items) {
            var _this = this;
            if (items === void 0) { items = []; }
            _super.call(this, D.div().append(this.ul_headers = D.ul(null, { role: 'tablist' }).addClass('nav nav-tabs'), this.div_panels = D.div().addClass('tab-content')));
            U.each(items, function (i, item) {
                _this.addTab(item[0], item[1]);
            });
        }
        Object.defineProperty(Tab.prototype, "selectedIndex", {
            get: function () {
                return this.ul_headers.find('.active').index();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "selectedItem", {
            get: function () {
                return this.div_panels.children().eq(this.selectedIndex);
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.addTab = function (title, content) {
            var _this = this;
            var id = U.uniqueId(), tabHeader = D.li().append(D.a({ href: '#' + id, 'data-toggle': 'tab' }).append(title).on('shown.bs.tab', function (e) {
                _this.triger('change');
            })), tabPanel = D.div({ id: id }).addClass('tab-pane').append(content);
            this.ul_headers.append(tabHeader);
            this.div_panels.append(tabPanel);
            if (this.ul_headers.children().length == 1) {
                tabHeader.addClass('active');
                tabPanel.addClass('active');
                this.triger('change');
            }
        };
        Tab.prototype.removeTab = function (index) {
            this.ul_headers.children().eq(index).remove();
            this.div_panels.children().eq(index).remove();
            this.selectTab(0);
        };
        Tab.prototype.enableTab = function (index) {
            this.ul_headers.children().eq(index).removeClass('disabled').css('pointer-events', '');
            this.selectTab(index);
        };
        Tab.prototype.disableTab = function (index) {
            this.ul_headers.children().eq(index).addClass('disabled').css('pointer-events', 'none');
            this.selectTab(0);
        };
        Tab.prototype.selectTab = function (index) {
            this.ul_headers.find('a[data-toggle="tab"]').eq(index).click();
        };
        return Tab;
    })(Element);
    return Tab;
});
//# sourceMappingURL=tab.js.map