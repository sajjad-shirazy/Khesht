/* ========================================================================
 BootJStrap: bootjstrap.js v0.1.0
 ========================================================================
 Mail me : shirazy.sajjad@gmail.com
 ======================================================================== */
/// <reference path="jquery.d.ts" />
interface BootJStrap {
    //--------------------------------------------------------------
    // utility
    head: JQuery;
    body: JQuery;
    _UID: Date;
    topmenusCount: number;
    dom(name, attr?): JQuery;
    uniqueId(): string;
    each(target: any, func: Function, bind?: any);
    uniqe(array: any[]): any[];
    //--------------------------------------------------------------
    // basic elements
    p(attr?): JQuery;
    em(attr?): JQuery;
    hr(attr?): JQuery;
    h1(attr?): JQuery;
    h2(attr?): JQuery;
    h3(attr?): JQuery;
    h4(attr?): JQuery;
    h5(attr?): JQuery;
    small(attr?): JQuery;
    br(times?, attr?): JQuery;
    center(attr?): JQuery;
    kbd(content?): JQuery;
    div(attr?): JQuery;
    img(attr?): JQuery;
    span(attr?): JQuery;
    strong(childs?, attr?): JQuery;
    /**
    * items : [item1,item2,...]
    * items : [[item1,value1],[item2,value2],...]
    */
    ul(items?, attr?): JQuery;
    li(attr?): JQuery;
    svg(attr?): JQuery;
    //--------------------------------------------------------------
    // UI
    a(attr?, icon?): JQuery;
    button(attr?, icon?): JQuery;
    input(attr?): JQuery;
    text(attr?): JQuery;
    textarea(attr?): JQuery;
    email(attr?): JQuery;
    password(attr?): JQuery;
    checkbox(attr?, desc?): JQuery;
    radio(attr?, desc?): JQuery;
    option(attr?): JQuery;
    /**
    * data : [item1,item2,...]
    * data : [[item1,value1],[item2,value2],...]
    */
    options(data): any[];
    /**
    * items : [item1,item2,...]
    * items : [[item1,value1],[item2,value2],...]
    */
    select(items?, attr?): JQuery;
    optgroup(attr?): JQuery; 
    submit(attr?, icon?): JQuery;
    form(attr?): JQuery;
    formGroup(attr?): JQuery;
    inputGroup(attr?): JQuery;
    inputAddon(minWidth, attr?): JQuery;
    inputAddonControl(minWidth, attr?): JQuery;
    label(forId, text, desc): JQuery;
    table(columns, rows): JQuery;
    tr(cells, cellTag): JQuery;
    fieldset(attr?);
    //--------------------------------------------------------------
    // components
    /*
    * items:anchor[]
    */
    listGroup(items: JQuery[], attr?): JQuery;
    pageHeader(attr?): JQuery;
    pageFooter(attr?): JQuery;
    labeledControl(id?, label?, desc?, lWidth?, control?): JQuery;
    panel(header?: any, body?: any, footer?: any): JQuery;
    progress(): JQuery;
    progressBar(value?: number, min?: number, max?: number): JQuery;
    alert(icon?: string): JQuery;
    collapse(id): JQuery;
    glyphicon(name): JQuery;
    dropdown(tag, title, items, icon?): JQuery;
    navbar(brand, left_menu, left_things, right_menu): JQuery;
    /**
    * items = [[title:JQuery,content:JQuery], [title:JQuery,content:JQuery], ...]
    */
    accordion(items: any[], css?: string): JQuery;
    /**
    * you can use .val of returned Object to get selected index 
    * returns: JQuery
    * items : [[title,content], [title,content],...]
    */
    tab(items?, attr?): JQuery;
    breadcrumb(): JQuery;
    topmenu(brand?, left_menu?, left_things?, right_menu?): JQuery;
    modal(size, header, body, footer);
    jumbotron(): JQuery;
}
declare module "b" {
    export = BootJStrap;
}
declare var B: BootJStrap;