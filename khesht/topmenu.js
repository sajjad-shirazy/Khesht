define(["require", "exports"], function (require, exports) {
    var TopMenu = (function () {
        function TopMenu(brand) {
            this.a_brand = null;
            this.ul_leftMenu = B.div();
            this.div_leftThings = B.div();
            this.ul_rightMenu = B.div();
            this.a_brand = brand || B.a().text('Khesht');
            B.body.append(B.topmenu(this.a_brand, this.ul_leftMenu, this.div_leftThings, this.ul_rightMenu).addClass('navbar-default'));
            this.ul_leftMenu = this.ul_leftMenu.parent().empty();
            this.ul_rightMenu = this.ul_rightMenu.parent().empty();
        }
        return TopMenu;
    })();
    return TopMenu;
});
//# sourceMappingURL=topmenu.js.map