function Universe(id) {
	this.id = id;
	this.name = '';

	this.setName = function(name) {
		this.name = name;
	};

	this.getName = function() {
		return this.name;
	};

}