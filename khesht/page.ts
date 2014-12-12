import U = require('khesht/utils');
import D = require('khesht/dom');
import Base = require('khesht/component');

class Page extends Base {
    private static historyListener: boolean;
    private static current: Page;
    static load(args = U.parsURL()) {
        NProgress.start();
        if (U.isString(args)) {
            args = { page: args };
        }
        args.page = args.page || 'index';
        if (this.current) {
            window.history.pushState(args, '', U.url(args));
        }
        if (!this.historyListener) {
            $(window).on('popstate', () => {
                U.log(history.state);
                if (history.state && history.state.page) {
                    this.load(history.state);
                }
            });
            this.historyListener = true;
        }
        U.loadModule('pages/' + args.page,
            (Page)=> {
                this.current = new Page(args);
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
        Page.load(U.parsURL($(e.target).attr('href')));
        return false;
    }
    args: any;
    constructor(args: any = {}) {
        this.args = args;
        super(D.body.empty());
        NProgress.inc();
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
        return U.url(this.args);
    }
}
export = Page;