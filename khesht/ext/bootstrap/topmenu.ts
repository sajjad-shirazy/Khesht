import D = require('khesht/ext/bootstrap/dom');
import Base = require('khesht/element');

class TopMenu extends Base {
    brand: JQuery = null;
    ul_leftMenu: JQuery = D.div();
    div_leftThings: JQuery = D.div();
    ul_rightMenu: JQuery = D.div();
    constructor(brand: JQuery) {
        super();
        this.brand = brand;
        this.dom = D.topmenu(
            this.brand,
            this.ul_leftMenu, //left menu
            this.div_leftThings, //left things(form,etc)
            this.ul_rightMenu  //right menu
            ).addClass('navbar-default');
        this.ul_leftMenu = this.ul_leftMenu.parent().empty();
        this.ul_rightMenu = this.ul_rightMenu.parent().empty();
    }
}
export = TopMenu;