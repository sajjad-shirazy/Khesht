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
    append(...contents: any[]) {
        this.dom.append.apply(this.dom, contents);
    }
    prepend(...contents: any[]) {
        this.dom.prepend.apply(this.dom, contents);
    }
}
export = Element;