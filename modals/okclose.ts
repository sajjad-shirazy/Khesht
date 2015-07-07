import D = require('khesht.bootstrap/dom');
import U = require('khesht/utils');
import Base = require('khesht.bootstrap/modal');

var $: JQueryStatic = require("jquery");

class OKClose extends Base {
    btn_ok: JQuery;
    btn_close: JQuery;
    img_loading: JQuery;
    constructor(options?: any) {
        super(options = $.extend({
            showCloseBotton: false,
            btn_ok: 'app.ok',
            btn_close: 'app.close'
        }, options));
        this.footer.append([
            this.btn_ok = D.button(null, 'ok').append(U.str(options.btn_ok)).addClass('btn-success').click(this.submit.bind(this)),
            this.btn_close = D.button({ 'data-dismiss': 'modal' }, 'remove').append(U.str(options.btn_close)).addClass('btn-default'),
            this.img_loading = D.loading().hide()
        ]);
    }
    showLoading(show: boolean) {
        if (show) {
            this.btn_close.hide();
            this.btn_ok.hide();
            this.img_loading.show();
        } else {
            this.btn_close.show();
            this.btn_ok.show();
            this.img_loading.hide();
        }
    }
    submit() {
        if (this.validate()) {
            this.showLoading(true);
            super.submit();
        }
    }
    onsuccess(data) {
        super.onsuccess(data);
        this.showLoading(false);
    }
    onfail(error) {
        super.onfail(error);
        this.showLoading(false);        
    }
    reset() {
        super.reset();
        this.showLoading(false);
    }
}
export = OKClose;