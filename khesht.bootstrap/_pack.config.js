({
    baseUrl: "..",
    //preserveLicenseComments: false,
    paths:{
    	"khesht": "empty:",
    },
    include: [		
    	"3rd-party/bootstrap/js/bootstrap.min.js",
		"khesht.bootstrap/dom",
		"khesht.bootstrap/form",
		"khesht.bootstrap/topmenu",
		"khesht.bootstrap/page",
		"khesht.bootstrap/table",
		"khesht.bootstrap/wizard",
		"khesht.bootstrap/wizardpage"
	],
    out: "khesht.bootstrap.js"
})