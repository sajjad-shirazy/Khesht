import D = require('khesht.bootstrap/dom');
import U = require('khesht/utils');
import APP = require('khesht/app');
import Base = require('khesht/page');
import TopMenu = require('khesht.bootstrap/topmenu');
import Form = require('khesht.bootstrap/form');

class Page extends Base {
    protected form: Form;
    protected div_messages: JQuery;
    public topMenu: TopMenu;
    constructor(args:any) {
        super(args, D.container().appendTo(D.body.empty()));
        this.form = new Form();
        this.append(this.form.DOM);
    }
    protected header(brand: JQuery = D.a({ href: U.param( {page:'index' }) }).append(APP.config.name).click(Page.navigate)): void {
        super.header();
        D.topmenusCount = 0;
        this.topMenu = new TopMenu(brand);
        this.append(this.topMenu.DOM);
    }
    protected body() {
        super.body();
        if (this.args.message) {
            this.form.addMessage(this.args.message, this.args.status);
        }
    }
    translateMessage(value: string): string {
        return value;
    }
    protected footer(content: JQuery = <any>APP.config.name): void {
        super.footer();
        D.body.append(D.container().append(D.br(), D.hr(), D.pageFooter().append(content)));
    }
    /*rtl() {
        APP.attachStyle('css/bootstrap-rtl.min.css');
        this.topMenu.ul_rightMenu.addClass('pull-left');
    }*/
}
export = Page;