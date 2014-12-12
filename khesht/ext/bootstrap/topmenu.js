var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/ext/bootstrap/dom', 'khesht/element'], function (require, exports, D, Base) {
    var TopMenu = (function (_super) {
        __extends(TopMenu, _super);
        function TopMenu(brand) {
            _super.call(this);
            this.brand = null;
            this.ul_leftMenu = D.div();
            this.div_leftThings = D.div();
            this.ul_rightMenu = D.div();
            this.brand = brand;
            this.dom = D.topmenu(this.brand, this.ul_leftMenu, this.div_leftThings, this.ul_rightMenu).addClass('navbar-default');
            this.ul_leftMenu = this.ul_leftMenu.parent().empty();
            this.ul_rightMenu = this.ul_rightMenu.parent().empty();
        }
        return TopMenu;
    })(Base);
    return TopMenu;
});
//# sourceMappingURL=topmenu.js.map