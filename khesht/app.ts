/// <amd-dependency path="nprogress/js/nprogress.min"/>
/// <amd-dependency path="stylesheet!nprogress/css/nprogress.min"/>

class Application {
    static config: any;
    constructor(config: any) {
        Application.config = config;
        document.title = Application.config.name = Application.config.name || 'khesht';
        NProgress.start();
        require.call(null, ['khesht/page'], function (Page) {
            Page.load();
        });
    }   
}
export = Application;
declare var APP: Application;