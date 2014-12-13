window.khesht = {
    config: {
        name: 'Khesht',
        version: '1.1',
        waitSeconds: 120, //make sure it is enough to load all gmaps scripts
        baseUrl: '//cdn.rawgit.com/sajjad-shirazy/Khesht/v1.0.4/',//change it to CDN url of your files
        paths: {
            requirejs: 	'//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.15/require.min',
            stylesheet: '//cdnjs.cloudflare.com/ajax/libs/require-css/0.1.5/css.min',
            async: 		'//cdnjs.cloudflare.com/ajax/libs/requirejs-plugins/1.0.3/async.min', //alias to plugin for JSONP and asynchronous dependencies (e.g. Google Maps).
            jquery: 	'//code.jquery.com/jquery-2.1.1.min',
            nprogress: 	'//cdnjs.cloudflare.com/ajax/libs/nprogress/0.1.6',
            bootstrap: 	'//maxcdn.bootstrapcdn.com/bootstrap/3.3.1',
			fileinput:	'//cdn.rawgit.com/kartik-v/bootstrap-fileinput/v3.0.0',
			// ---
            khesht: 	'//cdn.rawgit.com/sajjad-shirazy/Khesht/v1.0.4/khesht.min',
            pages: 		'pages.min',
            components: 'components.min',
            css: 		'css.min',
            images: 	'images',
            api: 		'/api'
        }
    }
};