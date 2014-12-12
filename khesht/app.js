/// <amd-dependency path="nprogress/js/nprogress.min"/>
/// <amd-dependency path="stylesheet!nprogress/css/nprogress.min"/>
define(["require", "exports", "nprogress/js/nprogress.min", "stylesheet!nprogress/css/nprogress.min"], function (require, exports) {
    var Application = (function () {
        function Application(config) {
            Application.config = config;
            document.title = Application.config.name = Application.config.name || 'khesht';
            NProgress.start();
            require.call(null, ['khesht/page'], function (Page) {
                Page.load();
            });
        }
        return Application;
    })();
    return Application;
});
//# sourceMappingURL=app.js.map