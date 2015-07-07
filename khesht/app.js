define(["require", "exports", "requirejs", "nprogress"], function (require, exports) {
    /// <amd-dependency path="requirejs"/>
    /// <amd-dependency path="nprogress"/>
    var Application = (function () {
        function Application(config) {
            window['NProgress'] = require('nprogress');
            NProgress.start();
            Application.config = config;
            //document.title = Application.config.name = Application.config.name || 'khesht';
            require.call(null, ['khesht/page'], function (Page) {
                config.defaultPage ? Page.load(config.defaultPage) : Page.load();
            });
        }
        return Application;
    })();
    return Application;
});
//# sourceMappingURL=app.js.map