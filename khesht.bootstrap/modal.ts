 import U = require('khesht/utils');
import D = require('khesht.bootstrap/dom');
import Base = require('khesht.bootstrap/form');

 var $: JQueryStatic = require("jquery");


 class Modal extends Base {
     static modalHeader(icon, title, showCloseButton): JQuery {
         return D.div().append((showCloseButton ? D.button({ 'class': 'close', 'data-dismiss': 'modal', 'aria-hidden': true }).append(D.span({ 'aria-hidden': true }).html('&times;'), D.span().text('Close').addClass('sr-only')) : null), D.dom('h4').addClass('modal-title').append((icon ? D.glyphicon(icon) : null), ' ', title)).children();
     }
     private modal: JQuery;
     protected header: JQuery;
     protected footer: JQuery;
     options: {
         ajaxSubmit: boolean;
         icon: string;
         title: string;
         showCloseBotton: boolean;
         id: string;
         size: string;
     };
     /**     
     * options: {
     *     ajaxSubmit: string; //default value is true
     *     icon: string;
     *     title: string;
     *     showCloseBotton: boolean;
     *     id: string;
     *     size: string;
     * };
     */
     constructor(options?: any) {
         this.options = $.extend({
             ajaxSubmit: true,
             icon: 'flag',
             title: '.titile',
             showCloseBotton: true,
             id: U.uniqueId(),
             size: ''
         }, options);
         super(null, this.options.ajaxSubmit);
         this.modal = D.div({ 'class': 'modal fade', role: 'dialog', tabindex: -1, 'aria-hidden': true, 'aria-labelledby': U.uniqueId() }).append(
             D.div().append(
                 D.div().append(
                     this.header = Modal.modalHeader(this.options.icon, this.options.title, this.options.showCloseBotton).addClass('modal-header'),
                     D.div().addClass('modal-body').append(this.dom.change(this.handleUpdate.bind(this))),
                     this.footer = D.div().addClass('modal-footer')
                     ).addClass('modal-content')
                 ).addClass('modal-dialog ' + this.options.size)
             ).attr({ id: this.options.id, 'data-backdrop': 'static', 'data-keyboard': false }).appendTo(D.body)
             .on({ 'show.bs.modal': this.onshow.bind(this), 'hidden.bs.modal': this.onclose.bind(this) });
         //this.dom.parent().append(D.br());
     }
     show() {
         this.modal.modal('show');
     }
     close() {
         this.modal.modal('hide');
     }
     onshow() {
     }
     onclose() {
         if ($('.modal-backdrop').length > 0) {
             D.body.addClass('modal-open');
         }
     }
     get link(): JQuery {
         return D.a({ 'data-toggle': 'modal', 'data-target': '#' + this.options.id }, this.options.icon).append(' ', this.options.title);
     }
     handleUpdate() {
         //U.log('handleUpdate', this.modal);
         var intervalHandler = setInterval(() => {
             this.modal.modal('handleUpdate');
             clearInterval(intervalHandler);
         }, 100);
     }
 }
export = Modal;