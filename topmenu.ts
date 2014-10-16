class TopMenu {
    a_brand: JQuery = null;
    ul_leftMenu: JQuery = B.div();
    div_leftThings: JQuery = B.div();
    ul_rightMenu: JQuery = B.div();
    constructor(brand: JQuery) {
        this.a_brand = brand || B.a().text('Khesht');
        B.body.append(
            //1-1 top menu
            B.topmenu(
                this.a_brand,
                this.ul_leftMenu, //left menu
                this.div_leftThings, //left things(form,etc)
                this.ul_rightMenu  //right menu
                ).addClass('navbar-default')
            );
        this.ul_leftMenu = this.ul_leftMenu.parent().empty();
        this.ul_rightMenu = this.ul_rightMenu.parent().empty();
    }
}
export = TopMenu;