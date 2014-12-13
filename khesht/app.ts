/// <amd-dependency path="nprogress/nprogress.min"/>
/// <amd-dependency path="stylesheet!nprogress/nprogress.min"/>

class Application {
    static config: any;
    constructor(config: any) {
        window['NProgress'] = require('nprogress/nprogress.min');
        NProgress.start();
        Application.config = config;
        document.title = Application.config.name = Application.config.name || 'khesht';
        require.call(null, ['khesht/page'], function (Page) {
            Page.load();
        });
    }   
}
export = Application;
declare var APP: Application;