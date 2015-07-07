import U = require('khesht/utils');
import D = require('khesht/dom');
import Element = require('khesht/element');

var $ = require("jquery");

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
        var done = () => {
            this.loaded = true;
            this.triger('load');
            this.start();
        }
        if (!this.loaded) {
            //loading ajax datas
            U.when(this.ajaxes(),
                (result) => {
                    $.extend(this, result);
                    done();
                }, () => {
                    this.start();
                    done();
                });
        }
    }
    protected start() {
    }
    get DOM(): JQuery {
        return this.dom;
    }
}
export = Component;