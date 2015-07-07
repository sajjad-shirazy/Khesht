import U = require('khesht/utils');
import D = require('khesht/dom');
import Base = require('khesht/component');

class Page extends Base {
    private static historyListener: boolean;
    public static current: Page;
    static load(args = U.parsURL()) {
        NProgress.start();
        if (U.isString(args)) {
            args = { page: args };
        }
        args.page = args.page || 'index';
        if (this.current) {
            window.history.pushState(args, '', U.baseURL(args));
        }
        if (!this.historyListener) {
            jQuery(window).on('popstate', () => {
                U.log(history.state);
                if (history.state && history.state.page) {
                    this.load(history.state);
                }
            });
            this.historyListener = true;
        }
        U.loadModule('pages/' + args.page,
            (Class)=> {
                Page.current = new Class(args);
            },
            () => {
                if (args.page != 'notfound') {
                    this.load({ page: 'notfound' });
                }
            });
    }
    static navigate(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        Page.load(U.parsURL(jQuery(e.target).attr('href')));
        return false;
    }
    args: any;
    constructor(args: any = {}, dom: JQuery = D.body.empty()) {
        this.args = args;
        NProgress.inc();
        super(dom);
    }
    protected start() {
        super.start();
        this.header();
        this.body();
        this.footer();
        NProgress.done();
    }
    protected header() {
    }
    protected body() {
    }
    protected footer() {
    }
    public get url(): string {
        return U.baseURL(this.args);
    }
}
export = Page;