/// <amd-dependency path="bootstrap/js/bootstrap.min"/>
/// <amd-dependency path="stylesheet!bootstrap/css/bootstrap.min.css"/>

import D = require('khesht/ext/bootstrap/dom');
import U = require('khesht/utils');
import APP = require('khesht/app');
import Base = require('khesht/page');
import TopMenu = require('khesht/ext/bootstrap/topmenu');
import Form = require('khesht/ext/bootstrap/form');

class Page extends Base {
    public topMenu: TopMenu;
    protected form: Form;
    protected div_messages: JQuery;
    constructor(args:any) {
        super(args);
        this.form = new Form(this);
        this.form.append(this.div_messages = D.div())
        this.dom = D.container().append(this.form.DOM).appendTo(this.dom);
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
            this.addMessage(this.args.message, this.args.status);
        }
    }
    translateMessage(value: string): string {
        return value;
    }
    protected footer(content: JQuery = <any>APP.config.name): void {
        super.footer();
        D.body.append(D.container().append(D.br(), D.hr(), D.pageFooter().append(content)));
    }
    /**
    * type : 'success','warning','fail' other values shows as info 
    */
    addMessage(text: string, mod: string = 'info') {
        switch (mod) {
            case 'success':
                mod = 'success';
                break;
            case 'warning':
                mod = 'warning';
                break;
            case 'fail':
                mod = 'danger';
                break;
            default:
                mod = 'info';
        }
        D.alert('bell').addClass('alert-' + mod).append(' ', this.translateMessage(text)).appendTo(this.div_messages);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
    /*rtl() {
        APP.attachStyle('css/bootstrap-rtl.min.css');
        this.topMenu.ul_rightMenu.addClass('pull-left');
    }*/
}
export = Page;