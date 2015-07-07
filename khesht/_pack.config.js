({
    baseUrl: "..",
    //preserveLicenseComments: false,
    paths:{
    	requirejs:"3rd-party/require/require.min",
    	nprogress:"3rd-party/nprogress/nprogress.min",
    	jquery:"3rd-party/jquery.min",
    },
    include: [				
		"khesht/app",
		"khesht/utils",
		"khesht/dom",
		"khesht/eventdispatcher",
		"khesht/element",
		"khesht/form",
		"khesht/page"
	],
    out: "khesht.js"
})