import D = require('khesht/dom');
import EventDispatcher = require('khesht/eventdispatcher');

class Element extends EventDispatcher {
    protected dom: JQuery;
    get DOM(): JQuery {
        return this.dom;
    }
    constructor(dom: JQuery) {
        super();
        this.dom = dom;
    }
    disable(name: string) {
        D.disable(this[name]);
    }
    enable(name: string) {
        D.enable(this[name]);
    }
    br(counts: number = null) {
        this.append(D.br(counts));
    }
    hr() {
        this.append(D.hr());
    }
    get(propertyName: string): JQuery {
        return this[propertyName];
    }
    appendProperty(name: string, control: JQuery):JQuery {
        if (name) this[name] = control;
        this.append(control);
        return control;
    }
    append(...contents: any[]) {
        this.dom.append.apply(this.dom, contents);
    }
    prepend(...contents: any[]) {
        this.dom.prepend.apply(this.dom, contents);
    }
}
export = Element;