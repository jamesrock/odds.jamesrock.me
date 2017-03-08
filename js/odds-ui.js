(function() {
	
	var 
	createNode = function(node) {
		
		return $(document.createElement(node));
		
	},
	createDiv = function() {
		
		return createNode("div");
		
	},
	createTable = function() {
		
		return createNode("table");
		
	},
	createTableHead = function() {
		
		return createNode("thead");
		
	},
	createTableBody = function() {
		
		return createNode("tbody");
		
	},
	createAnchor = function() {
		
		return createNode("a").attr("href", "#");
		
	},
	createAnchorButton = function() {
		
		return createAnchor().attr("data-role", "button");
		
	},
	createTextArea = function() {
		
		return createNode("textarea");
		
	};
	
})();