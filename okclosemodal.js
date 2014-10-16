var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/modal'], function(require, exports, Modal) {
    var OKClose = (function (_super) {
        __extends(OKClose, _super);
        function OKClose(size, icon, title, body) {
            _super.call(this, size, icon, title, body, [
                B.button({ 'data-dismiss': 'modal' }, 'remove').append(APP.str('app.close'))
            ]);
        }
        return OKClose;
    })(Modal);
    
    return OKClose;
});
//# sourceMappingURL=okclosemodal.js.map
