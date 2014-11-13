import EventDispatcher = require('khesht/eventdispatcher');
import TopMenu = require('khesht/topmenu');

class Page extends EventDispatcher implements IPage {
    topMenu: TopMenu;
    div_container: JQuery;
    div_main: JQuery;
    constructor() {
        super();
        B.body.empty();
        NProgress.inc();
        this.header();
        this.main();
    }
    header(brand: JQuery = B.a({ href: APP.getURL() }).append(APP.str('app.brand')/*, ' ', APP.config.version ? B.small().append(B.kbd(APP.config.version)) : null*/)): void {
        B.topmenusCount = 0;
        this.topMenu = new TopMenu(brand);
    }
    main() {
        this.div_container = B.div().addClass('container').append(
            this.div_main = B.div()
            ).appendTo(B.body);
    }
    footer(content: JQuery = <any>APP.str('app.copyright')): void {
        B.body.append(B.div().addClass('container').append(B.br(), B.hr(), B.pageFooter().append(content)));
    }
    finish(): void {
        this.footer();
        this.dispatchEvent('done');
        NProgress.done();
    }
    rtl() {
        APP.attachStyle('css/bootstrap-rtl.min.css');
        this.topMenu.ul_rightMenu.addClass('pull-left');
    }
    static input(control: JQuery, lable: string, desc?: string,lableWidth:number = 4): JQuery {
        return B.labeledControl(null, lable, desc, lableWidth, control);
    }
}
export = Page;