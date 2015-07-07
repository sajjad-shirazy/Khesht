import U = require('khesht/utils');
import D = require('khesht.bootstrap/dom');
import Element = require('khesht/element');

var $: JQueryStatic = require("jquery");

class Tab extends Element {
    private ul_headers: JQuery;
    private div_panels: JQuery;
    public get selectedIndex(): number { return this.ul_headers.find('.active').index(); }
    public get selectedItem(): JQuery { return this.div_panels.children().eq(this.selectedIndex); }
    /**
    * event : change
    * items : [[title,content], [title,content],...]
    */
    constructor(items: any[] = []) {
        super(D.div().append(
            this.ul_headers = D.ul(null, { role: 'tablist' }).addClass('nav nav-tabs'),
            this.div_panels = D.div().addClass('tab-content')
            ));
        U.each(items, (i, item) => {
            this.addTab(item[0], item[1]);
        });
    }
    addTab(title, content) {
        var id = U.uniqueId(),
            tabHeader = D.li().append(D.a({ href: '#' + id, 'data-toggle': 'tab' }).append(title).on('shown.bs.tab',(e) => {
                this.triger('change');
            })),
            tabPanel = D.div({ id: id }).addClass('tab-pane').append(content);
        this.ul_headers.append(tabHeader);
        this.div_panels.append(tabPanel);
        if (this.ul_headers.children().length == 1) {
            tabHeader.addClass('active');
            tabPanel.addClass('active');
            this.triger('change');
        }
    }
    removeTab(index: number) {
        this.ul_headers.children().eq(index).remove();
        this.div_panels.children().eq(index).remove();
        this.selectTab(0);
    }
    enableTab(index: number) {
        this.ul_headers.children().eq(index).removeClass('disabled').css('pointer-events', '');
        this.selectTab(index);
    }
    disableTab(index: number) {
        this.ul_headers.children().eq(index).addClass('disabled').css('pointer-events', 'none');
        this.selectTab(0);
    }
    selectTab(index: number) {
        this.ul_headers.find('a[data-toggle="tab"]').eq(index).click();
    }
}
export = Tab;