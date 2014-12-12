import U = require('khesht/utils');
import D = require('khesht/dom');
import Element = require('khesht/element');

class Component extends Element {
    protected ajaxes(): any {
        return {};
    }
    private loaded: boolean = false;
    public get initialized(): boolean {
        return this.loaded;
    }
    constructor(dom: JQuery, autoLoad: boolean = true) {
        super(dom);
        if (autoLoad) {
            this.load();
        }
    }
    load() {
        if (!this.loaded) {
            //loading ajax datas
            U.when(this.ajaxes(),
                (result) => {
                    $.extend(this, result);
                    this.start();
                }, () => {
                    this.start();
                });
        }
    }
    protected start() {
        this.loaded = true;
        this.dispatchEvent('load');
    }
    get DOM(): JQuery {
        return this.dom;
    }
}
export = Component;