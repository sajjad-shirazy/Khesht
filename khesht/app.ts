/// <amd-dependency path="requirejs"/>
/// <amd-dependency path="nprogress"/>
class Application {
    static config: any;
    constructor(config: any) {
        window['NProgress'] = require('nprogress');
        NProgress.start();
        Application.config = config;
        //document.title = Application.config.name = Application.config.name || 'khesht';
        require.call(null, ['khesht/page'], function (Page) {
            config.defaultPage ? Page.load(config.defaultPage) : Page.load();
        });
    }   
}
export = Application;
declare var APP: Application;