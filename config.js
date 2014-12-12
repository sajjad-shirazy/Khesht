window.khesht = {
    config: {
        name: 'Khesht',
        version: 'beta',
        waitSeconds: 120, //make sure it is enough to load all gmaps scripts
        baseUrl: '.',
        paths: {
            //@ khesht :
            requirejs: 'js/require/require.min',
            stylesheet: 'js/require/plugin/css',
            async: 'js/require/plugin/async', //alias to plugin for JSONP and asynchronous dependencies (e.g. Google Maps).
            jquery: 'js/jquery.min',
            nprogress: '.',
            khesht: 'khesht',
            images: 'images',
            pages: 'pages',
            api: 'api',
            //@ khesht/ext/bootstrap :
            bootstrap: '.'
        }
    }
};